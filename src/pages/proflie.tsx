import React, { useState, useEffect } from "react";
import { Edit } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import api from "@/utils/api";
import { toast } from "@/hooks/use-toast";

interface ProfileData {
  hospitalName: string;
  ownerDetails: string;
  hospitalLocation: string;
  phoneNumber: string;
  dateOfRegistration: string;
  dmhoRegistration: string;
  servicesOffered: string;
  specialistServices: string;
  numberOfBeds: number;
  areasOfInterest: string;
  incorporatingCertificate: string | null; // file name or null
  address: string;
}

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [originalProfileData, setOriginalProfileData] = useState<ProfileData | null>(null);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  // List of non-editable fields (including address)
  const nonEditableFields = [
    "incorporatingCertificate",
    "phoneNumber",
    "dateOfRegistration",
    "dmhoRegistration",
    "hospitalLocation",
    "hospitalName",
    "address", // Added address here
  ];

  // Fetch profile data
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await api.get("/hospital/getDetails");
        const result = response.data;

        if (result.status === 200) {
          const apiData: ProfileData = {
            hospitalName: result.data.hospitalName,
            ownerDetails: result.data.hospitalOwnerDetails,
            hospitalLocation: result.data.hospitalLocation,
            phoneNumber: result.data.hospitalPhoneNumber,
            dateOfRegistration: new Date(result.data.hospitalDateOfRegistration).toISOString().split("T")[0],
            dmhoRegistration: result.data.hospitalDMHORegistration,
            servicesOffered: result.data.hospitalServicesOffered,
            specialistServices: result.data.hospitalSpecialistServices,
            numberOfBeds: result.data.hospitalNumberOfBeds,
            areasOfInterest: result.data.hospitalAreasOfInterest,
            incorporatingCertificate: result.data.hospitalIncorporatingCertificate || null,
            address: result.data.hospitalLocation, // Assuming `hospitalLocation` is the address
          };
          setOriginalProfileData(apiData);
          setProfileData(apiData);
        } else {
          setError(result.message || "Failed to fetch profile data");
        }
      } catch (err) {
        setError("An error occurred while fetching data");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (profileData) {
      setProfileData({ ...profileData, [name]: value });
    }
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing); // Toggle overall edit mode
  };

  // Function to update profile data via API
  const updateProfile = async () => {
    try {
      setLoading(true);

      const response = await api.patch("/hospital/updateDetails", profileData);
      const result = response.data;

      if (result.status === 200) {
        toast({
          title: 'Success',
          description: result.message || 'Profile updated successfully!',
          variant: 'default',
          className: "bg-green-500 text-white",
        });
        setOriginalProfileData(profileData); // Save changes to the original state
        setIsEditing(false);
      } else {
        toast({
          title: 'Success',
          description: result.message || "Failed to update profile",
          variant: 'default',
          className: "bg-green-500 text-white",
        });
      }
    } catch (err) {
      toast({
        title: 'Error',
        description: "An error occurred while updating the profile.",
        variant: 'destructive',
      });
      console.error("Update error:", err);
    } finally {
      setLoading(false);
    }
  };

  const cancelChanges = () => {
    setProfileData(originalProfileData); // Reset to the original data
    setIsEditing(false);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <Card className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg relative">
      {/* Edit Icon */}
      <button
        onClick={toggleEditMode} // Toggle the edit mode for the whole profile
        className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition"
        title="Edit Profile"
      >
        <Edit className="h-6 w-6 text-gray-600" />
      </button>

      {/* Card Header */}
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-800">Profile</CardTitle>
      </CardHeader>

      {/* Card Content */}
      <CardContent>
        {profileData && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {(Object.keys(profileData) as (keyof ProfileData)[]).map((key) => (
              <div
                key={key}
                className={key === "address" ? "sm:col-span-2" : ""}
              >
                <label className="block text-sm font-medium text-gray-700 capitalize">
                  {key.replace(/([A-Z])/g, " $1")}
                </label>
                {isEditing && !nonEditableFields.includes(key) ? (
                  key === "incorporatingCertificate" ? (
                    <Input
                      type="file"
                      name={key}
                      onChange={(e) => {
                        const file = (e.target as HTMLInputElement).files?.[0];
                        if (file) {
                          setProfileData({ ...profileData, [key]: file.name });
                        }
                      }}
                    />
                  ) : key === "numberOfBeds" ? (
                    <Input
                      type="number"
                      name={key}
                      value={profileData[key] as number}
                      onChange={handleInputChange}
                    />
                  ) : key === "address" || key.includes("services") ? (
                    <Textarea
                      name={key}
                      value={profileData[key] as string}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <Input
                      type="text"
                      name={key}
                      value={profileData[key] as string}
                      onChange={handleInputChange}
                    />
                  )
                ) : (
                  <p className="mt-1 text-gray-800">
                    {key === "incorporatingCertificate"
                      ? profileData[key]
                        ? `Uploaded File: ${profileData[key]}`
                        : "No file uploaded"
                      : profileData[key]}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>

      {/* Card Footer with Save and Cancel Buttons */}
      {isEditing && (
        <CardFooter className="flex justify-end mt-6 space-x-4">
          <Button onClick={updateProfile} disabled={loading}>
            Save Changes
          </Button>
          <Button variant="outline" onClick={cancelChanges}>
            Cancel
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default Profile;

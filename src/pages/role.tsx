import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import api from '@/utils/api';  // Import the configured API instance
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, Phone, User } from 'lucide-react';
import { Card, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { schema } from '@/components/internal/types/schema';  // Import the updated schema

// Type inferred from the schema
type FormData = z.infer<typeof schema>;

const RoleAddForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    // Log the form data to the console
    console.log('Form data submitted:', data);

    const payload = {
      ...data
    };

    api.post('/hospital/patients/add', payload)  // Submit the form data
      .then((response) => {
        console.log('Patient added successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error adding patient:', error);
      });
  };

  const handleFormSubmit = () => {
    handleSubmit(onSubmit)();  // Manually trigger the form submission
  };

  return (
    <div>
      <Card className="max-w-5xl lg:h-[650px] mx-auto p-4 space-y-4 bg-white shadow-md rounded-[38px]">
        <CardHeader className="text-[#013DC0] text-2xl font-medium">Add Role</CardHeader>
        <form className="px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Name */}
            <div className="relative">
              <Label className="block text-sm font-medium text-gray-700 mb-4">Name</Label>
              <div className="mt-1 flex items-center">
                <User className="absolute left-3 text-gray-400" />
                <Input
                  type="text"
                  {...register('name')}
                  className="bg-[#E9F4FF] pl-10 py-3"
                />
              </div>
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>

            {/* Gender */}
            <div>
              <Label className="block text-sm font-medium text-gray-700 mb-4">Gender</Label>
              <select
                {...register('gender')}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 bg-[#E9F4FF] rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender.message}</p>}
            </div>

            {/* Email */}
            <div className="relative">
              <Label className="block text-sm font-medium text-gray-700 mb-4">Email</Label>
              <div className="mt-1 flex items-center">
                <Mail className="absolute left-3 text-gray-400" />
                <Input
                  type="email"
                  {...register('email')}
                  className="bg-[#E9F4FF] pl-10 py-3"
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            {/* Phone Number */}
            <div className="relative">
              <Label className="block text-sm font-medium text-gray-700 mb-4">Phone Number</Label>
              <div className="mt-1 flex items-center">
                <Phone className="absolute left-3 text-gray-400" />
                <Input
                  type="tel"
                  {...register('phoneNumber')}
                  className="bg-[#E9F4FF] pl-10 py-3"
                />
              </div>
              {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber.message}</p>}
            </div>

            {/* Date of Birth */}
            <div>
              <Label className="block text-sm font-medium text-gray-700 mb-4">Date of Birth</Label>
              <input
                type="date"
                {...register('dateOfBirth')}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 bg-[#E9F4FF] rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.dateOfBirth && <p className="text-red-500 text-xs mt-1">{errors.dateOfBirth.message}</p>}
            </div>

            {/* PAN Card */}
            <div className="relative">
              <Label className="block text-sm font-medium text-gray-700 mb-4">PAN Card</Label>
              <Input
                type="text"
                {...register('panCard')}
                className="bg-[#E9F4FF] pl-10 py-3"
              />
              {errors.panCard && <p className="text-red-500 text-xs mt-1">{errors.panCard.message}</p>}
            </div>

            {/* Aadhaar Card */}
            <div className="relative">
              <Label className="block text-sm font-medium text-gray-700 mb-4">Aadhaar Card</Label>
              <Input
                type="text"
                {...register('aadhaarCard')}
                className="bg-[#E9F4FF] pl-10 py-3"
              />
              {errors.aadhaarCard && <p className="text-red-500 text-xs mt-1">{errors.aadhaarCard.message}</p>}
            </div>

            {/* Role Name */}
            <div className="relative">
              <Label className="block text-sm font-medium text-gray-700 mb-4">Role Name</Label>
              <Input
                type="text"
                {...register('roleName')}
                className="bg-[#E9F4FF] pl-10 py-3"
              />
              {errors.roleName && <p className="text-red-500 text-xs mt-1">{errors.roleName.message}</p>}
            </div>

          </div>
        </form>
      </Card>
      <CardFooter className="flex justify-end mt-4 lg:mr-14">
        <Button
          type="button"
          onClick={handleFormSubmit}
          variant="primary"
          className="w-96 h-12"
        >
          Submit
        </Button>
      </CardFooter>
    </div>
  );
};

export default RoleAddForm;

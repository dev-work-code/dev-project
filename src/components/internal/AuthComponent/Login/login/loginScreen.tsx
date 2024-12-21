import { Card, CardFooter } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import Logo from "@/assets/Liv PrivateLimited Transprent 1.svg";
import LoginForm from "./loginForm";

const Component = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    console.log("OTP sent successfully!");
    navigate("/login/otp"); // Redirect to the OTP verification page
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="bg-white rounded-sm md:rounded-2xl lg:rounded-3xl dark:bg-background w-[539px] h-[564px] shadow-lg">
        <div className="w-96 mt-10 mx-auto flex flex-col items-center">
          <img
            src={Logo}
            alt="logo"
            className="w-[160px] h-[163px]"
            loading="lazy"
          />
          <div>
            <h1 className="block font-Inter text-xl font-medium text-[#013DC0] mb-4">Login</h1>
            <LoginForm onSuccess={handleSuccess} />
          </div>
          <CardFooter className="mt-4 font-light">Don’t have an account?  <span className="text-[#013DC0] ml-1"> Create one</span></CardFooter>
        </div>
      </Card>
    </div>
  );
};

export default Component;

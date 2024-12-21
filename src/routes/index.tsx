import HomeLayout from "@/components/layout/HomeLayout";
import Home from "@/pages/homelayout";
import Doctor from "@/pages/doctor";
import NotFound from "@/pages/notFound";
import { Suspense } from "react";
import { Navigate, Outlet, useRoutes } from "react-router-dom";
import AppointmentsPage from "@/pages/AppointmentsPage";
import PatientsPage from "@/pages/PatientsPage";
import Profile from "@/pages/proflie";
import Account from "@/pages/account";
import Role from "@/pages/role";
import Dashboard from "@/pages/dashboard";
import LoginScreen from "@/components/internal/AuthComponent/Login/login/loginScreen";
import OTPComponent from "@/components/internal/AuthComponent/Login/otp/otpScreen";
import RegisterScreen from "@/components/internal/AuthComponent/Register/RegisterScreen";
import DoctorDetail from "@/pages/DoctorDetail";
import LiveCases from "@/pages/LiveCases";
import ProfileScreen from "@/components/internal/Doctor/AddDoctor/PorfileScreen/profileScreen";

export default function AppRouter() {
  const privateRoutes = [
    {
      path: "/",
      element: (
        <HomeLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </HomeLayout>
      ),
      children: [
        {
          element: <Home />,
          index: true,
        },
        {
          path: "/doctor",
          element: <Doctor />,
        },
        {
          path: "/doctor/:doctorId",
          element: <DoctorDetail />,
        },
        {
          path: "/appointments",
          element: <AppointmentsPage />,
        },
        {
          path: "/patients",
          element: <PatientsPage />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/accounts",
          element: <Account />,
        },
        {
          path: "/role",
          element: <Role />,
        },
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
        {
          path: "/livecases",
          element: <LiveCases />,
        },
        {
          path: "/doctor/add",
          element: <ProfileScreen />,
        },

      ],
    },
  ];

  const publicRoutes = [
    {
      path: "/404",
      element: <NotFound />,
    },
    {
      path: "/register",
      element: <RegisterScreen />,
    },
    {
      path: "/login",
      element: <LoginScreen />,
    },
    {
      path: "/login/otp",
      element: <OTPComponent />,
    },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ];

  const routes = useRoutes([...privateRoutes, ...publicRoutes]);
  return routes;
}

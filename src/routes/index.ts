import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import About from "@/pages/About";
import Analytics from "@/pages/Admin/Analytics";
import ManageAllUsers from "@/pages/Admin/ManageAllUsers";
import Login from "@/pages/Login";
import ConfirmParcelDelivery from "@/pages/Receiver/ConfirmParcelDelivery";
import Register from "@/pages/Register";
import ParcelCreate from "@/pages/Sender/ParcelCreate";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
    {
        Component: App,
        path: "/",
        children: [
            {
                Component:About,
                path: "about", 
            },
        ],
    },
    {
        Component: DashboardLayout,
        path: "/admin",
        children: [
            {
                Component:ManageAllUsers,
                path: "manageusers", 
            },
            {
                Component:Analytics,
                path: "analytics", 
            },
        ],
    },
    {
        Component: DashboardLayout,
        path: "/sender",
        children: [
            {
                Component:ParcelCreate,
                path: "parcelcreate", 
            },
        ],
    },
    {
        Component: DashboardLayout,
        path: "/receiver",
        children: [
            {
                Component:ConfirmParcelDelivery,
                path: "confirmparcel", 
            },
        ],
    },

    {
        Component: Login,
        path: "/login",
    },
    {
        Component: Register,
        path: "/register",
    }
   
]);
import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import About from "@/pages/About";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { generateRoutes } from "@/utils/generateRoutes";
import { adminSidebarItems } from "./adminSidebarItems";
import { senderSidebarItems } from "./senderSidebarItem";
import { receiverSidebarItems } from "./receiverSideItem";
import { createBrowserRouter, Navigate } from "react-router";
import Unauthorized from "@/pages/Unauthorized";
import { withAuth } from "@/utils/withAuth";
import { role } from "@/constants/role";
import { TRole } from "@/type";
import ErrorPage from "../pages/ErrorPage";
import { withPublicRoute } from "@/utils/withPublicRoute";
import ProfilePage from "@/pages/MyProfile/ProfilePage";
export const router = createBrowserRouter([

    {
        Component: App,
        path: "/",
        errorElement: <ErrorPage />,
        children: [
            {
                path: "about",
                Component: withAuth(About),
            },
        ],
    },

    {
        Component: withAuth(DashboardLayout, role.Admin as TRole),
        path: "/admin",
        children: [
            { index: true, element: <Navigate to="/admin/analytics" /> },
            ...generateRoutes(adminSidebarItems),
            {
                path: "myprofile",
                Component: withAuth(ProfilePage),
            },


        ],

    },
    {
        Component: withAuth(DashboardLayout, role.Sender as TRole),
        path: "/sender",
        children:

            [
                { index: true, element: <Navigate to="/sender/parcelcreate" /> },
                ...generateRoutes(senderSidebarItems),

                {
                    path: "myprofile",
                    Component: withAuth(ProfilePage),
                },

            ]
    },
    {
        Component: withAuth(DashboardLayout, role.Receiver as TRole),
        path: "/receiver",
        children: [
            { index: true, element: <Navigate to="/receiver/viewincomingparcels" /> },
            ...generateRoutes(receiverSidebarItems),
            {
                path: "myprofile",
                Component: withAuth(ProfilePage),
            },

        ]
    },

    {
        Component: withPublicRoute(Login),
        path: "/login",
    },
    {
        Component: withPublicRoute(Register),
        path: "/register",
    },
    {
        Component: Unauthorized,
        path: "/unauthorized",
    }

]);


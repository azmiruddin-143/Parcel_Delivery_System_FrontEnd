import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import About from "@/pages/About";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { generateRoutes } from "@/utils/generateRoutes";
import { createBrowserRouter } from "react-router";
import { adminSidebarItems } from "./AdminSidebarItems";
import { senderSidebarItems } from "./senderSidebarItem";
import { receiverSidebarItems } from "./receiverSideItem";

export const router = createBrowserRouter([
    {
        Component: App,
        path: "/",
        children: [
            {
                Component: About,
                path: "about",
            },
        ],
    },
    {
        Component: DashboardLayout,
        path: "/admin",
        children: [...generateRoutes(adminSidebarItems)]

    },
    {
        Component: DashboardLayout,
        path: "/sender",
        children: [...generateRoutes(senderSidebarItems)]
    },
    {
        Component: DashboardLayout,
        path: "/receiver",
        children: [...generateRoutes(receiverSidebarItems)]
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
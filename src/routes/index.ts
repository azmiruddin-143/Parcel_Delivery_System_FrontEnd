import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import About from "@/pages/About";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { generateRoutes } from "@/utils/generateRoutes";
// import { createBrowserRouter, } from "react-router";
import { adminSidebarItems } from "./adminSidebarItems";
import { senderSidebarItems } from "./senderSidebarItem";
import { receiverSidebarItems } from "./receiverSideItem";
import { createBrowserRouter} from "react-router";
import Unauthorized from "@/pages/Unauthorized";
import { withAuth } from "@/utils/withAuth";
import { role } from "@/constants/role";
import { TRole } from "@/type";
export const router = createBrowserRouter([
    {
        Component: App,
        path: "/",
        children: [
            {
                Component: withAuth(About),
                path: "about",
            },
        ],
    },
    {
        Component: withAuth(DashboardLayout, role.Admin as TRole),
        path: "/admin",
        children: [
    //         {
    //     index: true, 
    //     element: <Navigate to="/admin/analytics" replace />,
    //   },
        ...generateRoutes(adminSidebarItems)],

    },
    {
        Component: withAuth(DashboardLayout, role.Sender as TRole),
        path: "/sender",
        children: [...generateRoutes(senderSidebarItems)]
    },
    {
        Component: withAuth(DashboardLayout, role.Receiver as TRole),
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
    },
    {
        Component: Unauthorized,
        path: "/unauthorized",
    }

]);
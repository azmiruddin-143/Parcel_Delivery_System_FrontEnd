
import ManageAllParcels from "@/pages/Admin/ManageAllParcels";
import ManageAllUsers from "@/pages/Admin/ManageAllUsers";
import { ISidebarItem } from "@/type";
import { lazy } from "react";


const Analytics = lazy(() => import("@/pages/Admin/Analytics"));
export const adminSidebarItems : ISidebarItem[] = [
    {
      title: "Dashboard",
      items: [
        {
          title: "Analytics",
          url: "/admin/analytics",
          component:Analytics,
        },
       
      ],
    },
    {
      title: "Manage Users And Parcels",
      items: [
        {
          title: "Manage All Users",
          url: "/admin/manageusers",
          component:ManageAllUsers,
        },
        {
          title: "Manage All Parcels",
          url: "/admin/manageparcels",
          component:ManageAllParcels,
        },
    
      ],
    },
    
  ]
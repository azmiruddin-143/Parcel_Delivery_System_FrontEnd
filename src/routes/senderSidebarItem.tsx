
import ParcelCancel from "@/pages/Sender/ParcelCancel";
import ParcelCreate from "@/pages/Sender/ParcelCreate";
import ViewAllCreatedParcels from "@/pages/Sender/ViewAllCreatedParcels";
import { ISidebarItem } from "@/type";

export const senderSidebarItems : ISidebarItem[] = [
    {
      title: "Sender",
      items: [
        {
          title: "Parcel Create",
          url: "/sender/parcelcreate",
          component:ParcelCreate,
        },
        {
          title: "Parcel Cancel",
          url: "/sender/parcelcancel",
          component:ParcelCancel,
        },
        {
          title: "View AllCreated Parcels",
          url: "/sender/viewallcreatedparcels",
          component:ViewAllCreatedParcels,
        },
      ],
    },
    
  ]
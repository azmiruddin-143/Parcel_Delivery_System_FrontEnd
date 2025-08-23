
import ConfirmParcelDelivery from "@/pages/Receiver/ConfirmParcelDelivery";
import ViewDeliveryHistory from "@/pages/Receiver/ViewDeliveryHistory";
import ViewIncomingParcels from "@/pages/Receiver/ViewIncomingParcels";
import { ISidebarItem } from "@/type";

export const receiverSidebarItems : ISidebarItem[] = [
    {
      title: "Receiver",
      items: [
        {
          title: "Confirm Parcel Delivery",
          url: "/receiver/confirmparceldelivery",
          component:ConfirmParcelDelivery,
        },
        {
          title: "View Delivery History",
          url: "/receiver/viewdeliveryhistory",
          component:ViewDeliveryHistory,
        },
        {
          title: "View Incoming Parcels",
          url: "/receiver/viewincomingparcels",
          component:ViewIncomingParcels,
        },
      ],
    },
    
  ]
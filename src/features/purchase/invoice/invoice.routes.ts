import type {AppRoute} from "@/routes/types.ts";
import {lazy} from "react";

const PurchaseInvoice = lazy(
  () => import("@/features/purchase/invoice/pages/PurchaseInvoice.tsx")
);

const invoiceRoutes: AppRoute[] = [
  {
    path: "",
    component: PurchaseInvoice,
  },
];

export default invoiceRoutes;

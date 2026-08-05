import type {AppRoute} from "@/routes/types.ts";
import {lazy} from "react";

const PurchaseInvoice = lazy(
  () => import("@/features/purchase/invoice/pages/PurchaseInvoice.tsx")
);

const invoiceRoutes: AppRoute[] = [
  {
    path: "/valyron/purchase-invoice",
    component: PurchaseInvoice,
  },
];

export default invoiceRoutes;

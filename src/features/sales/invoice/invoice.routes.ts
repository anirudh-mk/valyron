import type {AppRoute} from "@/routes/types.ts";
import {lazy} from "react";

const SalesInvoice = lazy(
  () => import("@/features/sales/invoice/pages/SalesInvoice.tsx")
);

const invoiceRoutes: AppRoute[] = [
  {
    path: "",
    component: SalesInvoice,
  },
];

export default invoiceRoutes;

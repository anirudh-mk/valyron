import type {AppRoute} from "@/routes/types.ts";
import {lazy} from "react";

const Supplier = lazy(
  () => import("@/features/party/supplier/SuppliersWithTabs.tsx")
);

const supplierRoutes: AppRoute[] = [
  {
    path: "/valyron/suppliers",
    component: Supplier,
  },
];

export default supplierRoutes;

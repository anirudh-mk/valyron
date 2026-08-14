import type {AppRoute} from "@/routes/types.ts";
import {lazy} from "react";

const SupplierCreate = lazy(
  () => import("@/features/party/supplier/pages/SupplierCreate.tsx")
);

const supplierRoutes: AppRoute[] = [
  {
    path: "",
    component: SupplierCreate,
  },
];

export default supplierRoutes;

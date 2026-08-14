import type {AppRoute} from "@/routes/types.ts";
import {lazy} from "react";

const Suppliers = lazy(
  () => import("@/features/party/supplier/pages/Suppliers.tsx")
);
const SupplierCreate = lazy(
  () => import("@/features/party/supplier/pages/SupplierCreate.tsx")
);

const supplierRoutes: AppRoute[] = [
  {
    path: "",
    component: Suppliers,
  },
  {
    path: "create",
    component: SupplierCreate,
  },
];

export default supplierRoutes;

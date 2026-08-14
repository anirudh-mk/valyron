import type {AppRoute} from "@/routes/types.ts";
import {lazy} from "react";

const Customers = lazy(
  () => import("@/features/party/customer/pages/Customers.tsx")
);
const CustomerCreate = lazy(
  () => import("@/features/party/customer/pages/CustomerCreate.tsx")
);

const customerRoutes: AppRoute[] = [
  {
    path: "",
    component: Customers,
  },
  {
    path: "create",
    component: CustomerCreate,
  },
];

export default customerRoutes;
import type {AppRoute} from "@/routes/types.ts";
import {lazy} from "react";

const CustomerCreate = lazy(
  () => import("@/features/party/customer/pages/CustomerCreate.tsx")
);

const customerRoutes: AppRoute[] = [
  {
    path: "",
    component: CustomerCreate,
  },
];

export default customerRoutes;
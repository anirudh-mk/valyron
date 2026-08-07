import type {AppRoute} from "@/routes/types.ts";
import {lazy} from "react";

const Customer = lazy(
  () => import("@/features/party/customer/pages/CustomersWithTabs.tsx")
);

const customerRoutes: AppRoute[] = [
  {
    path: "",
    component: Customer,
  },
];

export default customerRoutes;
import type {AppRoute} from "@/routes/types.ts";
import {lazy} from "react";

const Customer = lazy(
  () => import("@/features/party/customer/CustomersWithTabs.tsx")
);

const customerRoutes: AppRoute[] = [
  {
    path: "/valyron/customers",
    component: Customer,
  },
];

export default customerRoutes;
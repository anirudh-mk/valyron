import type {AppRoute} from "@/routes/types.ts";
import {lazy} from "react";

const SalesOrder = lazy(
  () => import("@/features/sales/order/pages/SalesOrder.tsx")
);

const orderRoutes: AppRoute[] = [
  {
    path: "/valyron/sales-order",
    component: SalesOrder,
  },
];

export default orderRoutes;

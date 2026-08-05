import type {AppRoute} from "@/routes/types.ts";
import {lazy} from "react";

const PurchaseOrder = lazy(
  () => import("@/features/purchase/order/pages/PurchaseOrder.tsx")
);

const orderRoutes: AppRoute[] = [
  {
    path: "/valyron/purchase-order",
    component: PurchaseOrder,
  },
];

export default orderRoutes;

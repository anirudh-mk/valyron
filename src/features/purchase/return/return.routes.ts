import type {AppRoute} from "@/routes/types.ts";
import {lazy} from "react";

const PurchaseReturn = lazy(
  () => import("@/features/purchase/return/pages/PurchaseReturn.tsx")
);

const returnRoutes: AppRoute[] = [
  {
    path: "",
    component: PurchaseReturn,
  },
];

export default returnRoutes;

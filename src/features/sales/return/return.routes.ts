import type {AppRoute} from "@/routes/types.ts";
import {lazy} from "react";

const SalesReturn = lazy(
  () => import("@/features/sales/return/pages/SalesReturn.tsx")
);

const returnRoutes: AppRoute[] = [
  {
    path: "",
    component: SalesReturn,
  },
];

export default returnRoutes;

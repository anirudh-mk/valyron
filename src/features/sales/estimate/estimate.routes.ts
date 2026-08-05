import type {AppRoute} from "@/routes/types.ts";
import {lazy} from "react";

const SalesEstimate = lazy(
  () => import("@/features/sales/estimate/pages/SalesEstimate.tsx")
);

const estimateRoutes: AppRoute[] = [
  {
    path: "/valyron/sales-estimate",
    component: SalesEstimate,
  },
];

export default estimateRoutes;

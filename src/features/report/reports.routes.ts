import type {AppRoute} from "@/routes/types.ts";
import {lazy} from "react";

const Reports = lazy(
  () => import("@/features/report/Report.tsx" )
);

const reportRoutes: AppRoute[] = [
  {
    path: "/valyron/reports",
    component: Reports,
  },
];

export default reportRoutes;

import type {AppRoute} from "@/routes/types.ts";
import {lazy} from "react";

const Dashboard = lazy(
  () => import("@/features/dashboard/pages/Dashboard.tsx")
);

const dashboardRoutes: AppRoute[] = [
  {
    path: "/valyron/",
    component: Dashboard,
  },
];

export default dashboardRoutes;

import type {AppRoute} from "@/routes/types.ts";
import {lazy} from "react";

const Settings = lazy(
  () => import("@/features/settings/pages/Settings.tsx")
);

const settingsRoutes: AppRoute[] = [
  {
    path: "/valyron/settings",
    component: Settings,
  },
];

export default settingsRoutes;

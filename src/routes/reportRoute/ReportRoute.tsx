import ReportsDashboard from "@/features/report/Report";
import type { FC } from "react";

export interface AppRoute {
    path: string;
    component: FC;
}

const reportRoutes: AppRoute[] = [
    {
        path: "/valyron/reports",
        component: ReportsDashboard,
    },
   
];

export default reportRoutes;

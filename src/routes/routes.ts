import {salesRoutes} from "@/features/sales/sales.routes.ts";
import type {AppRoute} from "@/routes/types.ts";

const routes: AppRoute[] = [
  ...salesRoutes,
];

export default routes;
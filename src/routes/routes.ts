import {salesRoutes} from "@/features/sales/sales.routes.ts";
import type {AppRoute} from "@/routes/types.ts";
import {purchaseRoutes} from "@/features/purchase/purchase.routes.ts";

const routes: AppRoute[] = [
  ...salesRoutes,
  ...purchaseRoutes,
];

export default routes;
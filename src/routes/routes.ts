import {salesRoutes} from "@/features/sales/sales.routes.ts";
import type {AppRoute} from "@/routes/types.ts";
import {purchaseRoutes} from "@/features/purchase/purchase.routes.ts";
import dashboardRoutes from "@/features/dashboard/dashboard.routes.ts";
import productRoutes from "@/features/products/products.routes.ts";
import reportRoutes from "@/features/report/reports.routes.ts";
import {partyRoutes} from "@/features/party/party.routes.ts";

const routes: AppRoute[] = [
  ...dashboardRoutes,
  ...productRoutes,
  ...salesRoutes,
  ...purchaseRoutes,
  ...partyRoutes,
  ...reportRoutes,
];

export default routes;
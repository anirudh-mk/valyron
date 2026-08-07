import {salesRoutes} from "@/features/sales/sales.routes.ts";
import type {AppRoute} from "@/routes/types.ts";
import {purchaseRoutes} from "@/features/purchase/purchase.routes.ts";
import dashboardRoutes from "@/features/dashboard/dashboard.routes.ts";
import productRoutes from "@/features/products/products.routes.ts";
import reportRoutes from "@/features/report/reports.routes.ts";
import {partyRoutes} from "@/features/party/party.routes.ts";
import settingsRoutes from "@/features/settings/settings.routes.ts";

const routes: AppRoute[] = [
  ...dashboardRoutes,
  ...productRoutes,
  {path: "dashboard/sales", children: salesRoutes},
  {path: "valyron/purchase", children: purchaseRoutes},
  {path: "valyron/party", children: partyRoutes},
  ...reportRoutes,
  ...settingsRoutes,
];

export default routes;
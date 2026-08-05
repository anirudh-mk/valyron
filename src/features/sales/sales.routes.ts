import type {AppRoute} from "@/routes/types";
import invoiceRoutes from "@/features/sales/invoice/invoice.routes";
import estimateRoutes from "@/features/sales/estimate/estimate.routes.ts";
import orderRoutes from "@/features/sales/order/order.routes.ts";
import returnRoutes from "@/features/sales/return/return.routes.ts";

export const salesRoutes: AppRoute[] = [
  ...invoiceRoutes,
  ...estimateRoutes,
  ...orderRoutes,
  ...returnRoutes
];
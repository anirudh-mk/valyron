import orderRoutes from "@/features/purchase/order/order.routes.ts";
import returnRoutes from "@/features/purchase/return/return.routes.ts";
import invoiceRoutes from "@/features/purchase/invoice/invoice.routes.ts";
import type {AppRoute} from "@/routes/types.ts";

export const purchaseRoutes: AppRoute[] = [
  {
    path: "invoice",
    children: invoiceRoutes,
  },
  {
    path: "order",
    children: orderRoutes,
  },
  {
    path: "return",
    children: returnRoutes,
  },
];
import type {AppRoute} from "@/routes/types.ts";
import customerRoutes from "@/features/party/customer/customer.routes.ts";
import supplierRoutes from "@/features/party/supplier/supplier.routes.ts";

export const partyRoutes: AppRoute[] = [
  ...customerRoutes,
  ...supplierRoutes,
]
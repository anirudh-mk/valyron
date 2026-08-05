import PurchaseInvoiceWithTabs from "@/features/purchse/PurchaseInvoice";
import PurchaseOrderWithTabs from "@/features/purchaseOrder/PurchaseOrder";
import PurchaseReturnWithTabs from "@/features/purchaseReturn/PurchaseReturn";

import type { FC } from "react";

export interface AppRoute {
    path: string;
    component: FC;
}

const purchaseRoutes: AppRoute[] = [
  {
    path: "/valyron/purchase-invoice",
    component: PurchaseInvoiceWithTabs,
  },
    {
    path: "/valyron/purchase-order",
    component: PurchaseOrderWithTabs,
  },
    {
    path: "/valyron/purchase-return",
    component: PurchaseReturnWithTabs,
  }
 
 
];

export default purchaseRoutes;

import type { AppRoute } from "@/routes/types.ts";
import { lazy } from "react";

const QuotationList = lazy(
  () => import("@/features/sales/quotation/pages/QuotationList.tsx")
);
const QuotationCreate = lazy(
  () => import("@/features/sales/quotation/pages/QuotationCreate.tsx")
);
const QuotationDetails = lazy(
  () => import("@/features/sales/quotation/pages/QuotationDetails.tsx")
);
const QuotationRevisions = lazy(
  () => import("@/features/sales/quotation/pages/QuotationRevisions.tsx")
);
const QuotationApproval = lazy(
  () => import("@/features/sales/quotation/pages/QuotationApproval.tsx")
);
const QuotationSend = lazy(
  () => import("@/features/sales/quotation/pages/QuotationSend.tsx")
);
const QuotationExpired = lazy(
  () => import("@/features/sales/quotation/pages/QuotationExpired.tsx")
);
const QuotationToOrder = lazy(
  () => import("@/features/sales/quotation/pages/QuotationToOrder.tsx")
);

const quotationRoutes: AppRoute[] = [
  {
    path: "",
    component: QuotationList,
  },
  {
    path: "list",
    component: QuotationList,
  },
  {
    path: "create",
    component: QuotationCreate,
  },
  {
    path: "details",
    component: QuotationDetails,
  },
  {
    path: "revisions",
    component: QuotationRevisions,
  },
  {
    path: "approval",
    component: QuotationApproval,
  },
  {
    path: "send",
    component: QuotationSend,
  },
  {
    path: "expired",
    component: QuotationExpired,
  },
  {
    path: "to-order",
    component: QuotationToOrder,
  },
];

export default quotationRoutes;

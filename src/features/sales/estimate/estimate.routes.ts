import type { AppRoute } from "@/routes/types.ts";
import { lazy } from "react";

const EstimateList = lazy(
  () => import("@/features/sales/estimate/pages/EstimateList.tsx")
);
const EstimateCreate = lazy(
  () => import("@/features/sales/estimate/pages/EstimateCreate.tsx")
);
const EstimateDetails = lazy(
  () => import("@/features/sales/estimate/pages/EstimateDetails.tsx")
);
const EstimateRevisions = lazy(
  () => import("@/features/sales/estimate/pages/EstimateRevisions.tsx")
);
const EstimateApproval = lazy(
  () => import("@/features/sales/estimate/pages/EstimateApproval.tsx")
);
const EstimateToQuotation = lazy(
  () => import("@/features/sales/estimate/pages/EstimateToQuotation.tsx")
);

const estimateRoutes: AppRoute[] = [
  {
    path: "",
    component: EstimateList,
  },
  {
    path: "list",
    component: EstimateList,
  },
  {
    path: "create",
    component: EstimateCreate,
  },
  {
    path: "details",
    component: EstimateDetails,
  },
  {
    path: "revisions",
    component: EstimateRevisions,
  },
  {
    path: "approval",
    component: EstimateApproval,
  },
  {
    path: "to-quotation",
    component: EstimateToQuotation,
  },
];

export default estimateRoutes;

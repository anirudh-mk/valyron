import type {AppRoute} from "@/routes/types";
import {lazy} from "react";
import invoiceRoutes from "@/features/sales/invoice/invoice.routes";
import estimateRoutes from "@/features/sales/estimate/estimate.routes.ts";
import quotationRoutes from "@/features/sales/quotation/quotation.routes.ts";
import orderRoutes from "@/features/sales/order/order.routes.ts";
import returnRoutes from "@/features/sales/return/return.routes.ts";

const SalesDashboard = lazy(
  () => import("@/features/sales/dashboard/pages/SalesDashboard.tsx")
);
const LeadsList = lazy(
  () => import("@/features/sales/leads/pages/LeadsList.tsx")
);
const LeadCreate = lazy(
  () => import("@/features/sales/leads/pages/LeadCreate.tsx")
);
const OpportunitiesList = lazy(
  () => import("@/features/sales/opportunities/pages/OpportunitiesList.tsx")
);
const ActivitiesList = lazy(
  () => import("@/features/sales/activities/pages/ActivitiesList.tsx")
);
const FollowupsList = lazy(
  () => import("@/features/sales/followups/pages/FollowupsList.tsx")
);
const SalesPipeline = lazy(
  () => import("@/features/sales/pipeline/pages/SalesPipeline.tsx")
);

export const salesRoutes: AppRoute[] = [
  {
    path: "",
    component: SalesDashboard,
  },
  {
    path: "dashboard",
    component: SalesDashboard,
  },
  {
    path: "leads",
    component: LeadsList,
  },
  {
    path: "leads/create",
    component: LeadCreate,
  },
  {
    path: "opportunities",
    component: OpportunitiesList,
  },
  {
    path: "activities",
    component: ActivitiesList,
  },
  {
    path: "followups",
    component: FollowupsList,
  },
  {
    path: "pipeline",
    component: SalesPipeline,
  },
  {
    path: "invoice",
    children: invoiceRoutes,
  },
  {
    path: "estimate",
    children: estimateRoutes,
  },
  {
    path: "quotation",
    children: quotationRoutes,
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
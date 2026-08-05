import type {AppRoute} from "@/routes/types.ts";
import {lazy} from "react";

const Product = lazy(
  () => import("@/features/products/pages/Products.tsx")
);

const productRoutes: AppRoute[] = [
  {
    path: "/valyron/products",
    component: Product,
  },
];

export default productRoutes;

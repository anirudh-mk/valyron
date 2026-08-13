import type {AppRoute} from "@/routes/types.ts";
import {lazy} from "react";

const ProductList = lazy(
  () => import("@/features/products/pages/Products.tsx")
);
const ProductCreate = lazy(
  () => import("@/features/products/pages/ProductCreate.tsx")
);

const productRoutes: AppRoute[] = [
  {
    path: "/valyron/products",
    component: ProductList,
  },
  {
    path: "/valyron/products/create",
    component: ProductCreate,
  },
];

export default productRoutes;

import type { FC } from "react";
import Products from "@/features/products/Products";

export interface AppRoute {
    path: string;
    component: FC;
}

const productRoute: AppRoute[] = [
    {
        path: "/valyron/products",
        component: Products,
    },
   
];

export default productRoute;

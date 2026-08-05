import CustomersWithTabs from "@/features/customer/CustomersWithTabs";
import SuppliersWithTabs from "@/features/supplier/SuppliersWithTabs";
import type { FC } from "react";

export interface AppRoute {
    path: string;
    component: FC;
}

const contactRoutes: AppRoute[] = [
    {
        path: "/valyron/customers",
        component: CustomersWithTabs,
    },
    {
        path: "/valyron/suppliers",
        component: SuppliersWithTabs,
    }

];

export default contactRoutes;

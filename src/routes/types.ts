import type {ComponentType, LazyExoticComponent} from "react";

export type RouteComponent = LazyExoticComponent<ComponentType<object>>;

export interface AppRoute {
  path: string;
  component: RouteComponent;
  title?: string;
  permission?: string;
  layout?: "main" | "auth";
  children?: AppRoute[];
}
import type {ComponentType, LazyExoticComponent} from "react";

export type RouteComponent = LazyExoticComponent<ComponentType<object>>;

interface BaseRoute {
  path: string;
  title?: string;
  permission?: string;
  layout?: "main" | "auth";
}

export interface ComponentRoute extends BaseRoute {
  component: RouteComponent;
  children?: AppRoute[];
}

export interface ParentRoute extends BaseRoute {
  children: AppRoute[];
  component?: never;
}

export type AppRoute = ComponentRoute | ParentRoute;
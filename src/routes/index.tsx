import {Routes, Route} from "react-router-dom";
import type {AppRoute} from "./types";
import routes from "./routes";
import AuthLayout from "@/layouts/AuthLayout.tsx";
import ErrorLayout from "@/layouts/ErrorLayout.tsx";
import NotFound from "@/features/error/pages/NotFound.tsx";

export default function AppRoutes() {
  const renderRoute = (route: AppRoute) => {
    const Element = route.component;
    return (
      <Route
        key={route.path}
        path={route.path}
        element={Element ? <Element /> : undefined}
      >
        {route.children?.map(renderRoute)}
      </Route>
    );
  };

  return (
    <Routes>
      {/* Authenticated layout routes */}
      <Route element={<AuthLayout />}>
        {routes.map(renderRoute)}
      </Route>

      {/* Error layout routes */}
      <Route element={<ErrorLayout />}>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
import {Routes, Route} from "react-router-dom";
import type {AppRoute} from "./types";
import routes from "./routes";

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
      {routes.map(renderRoute)}
    </Routes>
  );
}
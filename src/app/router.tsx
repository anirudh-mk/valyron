import {BrowserRouter} from "react-router-dom";
import {Suspense} from "react";

import AppRoutes from "@/routes";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <AppRoutes/>
      </Suspense>
    </BrowserRouter>
  );
}
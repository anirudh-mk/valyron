import {BrowserRouter} from "react-router-dom";
import {Suspense} from "react";

import AuthLayout from "../layouts/AuthLayout.tsx";
import AppRoutes from "@/routes";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <AuthLayout>
        <Suspense fallback={<div>Loading...</div>}>
          <AppRoutes/>
        </Suspense>
      </AuthLayout>
    </BrowserRouter>
  );
}
import {BrowserRouter} from "react-router-dom";
import {Suspense} from "react";

import Layout from "./layout.tsx";
import AppRoutes from "@/routes";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<div>Loading...</div>}>
          <AppRoutes/>
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
}
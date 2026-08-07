import type { ReactNode } from "react";
import { Outlet } from "react-router-dom";

export default function ErrorLayout({ children }: { children?: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <main className="w-full flex items-center justify-center py-12">
        {children ?? <Outlet />}
      </main>
    </div>
  );
}

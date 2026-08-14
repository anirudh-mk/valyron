import { useNavigate } from "react-router-dom";
import { Button } from "@/components/base/button.tsx";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-md mx-auto text-center px-6 flex flex-col items-center">
      {/* Neat, Minimalistic Large 404 text */}
      <div className="mb-4">
        <h1 className="text-8xl font-extrabold tracking-tighter text-slate-200 dark:text-slate-800">
          404
        </h1>
      </div>

      {/* Main Copy */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-white">
          Page not found
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
          The page you are looking for doesn't exist or has been moved.
        </p>
      </div>

      {/* Minimalistic Action Buttons */}
      <div className="mt-8 flex items-center justify-center gap-3 w-full max-w-xs">
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
          className="flex-1 inline-flex items-center justify-center gap-2 h-10 rounded-lg text-sm font-medium border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Go Back
        </Button>
        <Button
          onClick={() => navigate("/dashboard")}
          className="flex-1 inline-flex items-center justify-center gap-2 h-10 rounded-lg text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-colors"
        >
          <Home className="h-4 w-4" />
          Dashboard
        </Button>
      </div>
    </div>
  );
}

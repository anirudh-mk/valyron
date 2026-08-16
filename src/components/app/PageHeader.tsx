import { Button } from "@/components/base/button.tsx";
import { Star } from "lucide-react";
import React from "react";
import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  isStarred?: boolean;
  onStarToggle?: () => void;
  children?: ReactNode;
}

export default function PageHeader({
  title,
  description,
  isStarred,
  onStarToggle,
  children
}: PageHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-100">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">{title}</h1>
          {onStarToggle !== undefined && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:bg-slate-100 rounded-full"
              onClick={onStarToggle}
            >
              <Star
                className={`h-5 w-5 transition-colors ${
                  isStarred ? "fill-amber-400 stroke-amber-500" : "text-slate-400"
                }`}
              />
            </Button>
          )}
        </div>
        {description && (
          <p className="text-sm text-slate-500 mt-0.5">
            {description}
          </p>
        )}
      </div>

      {/* Action Buttons / Controls */}
      {children && (
        <div className="flex items-center gap-3 self-end md:self-auto relative">
          {children}
        </div>
      )}
    </div>
  );
}
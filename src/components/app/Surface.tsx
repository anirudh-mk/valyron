import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface SurfaceProps {
  children: ReactNode;
  className?: string;
}

export default function Surface({
  children,
  className,
}: SurfaceProps) {
  return (
    <div
      className={cn(
        "flex min-h-screen flex-col gap-3 p-4 text-foreground",
        className
      )}
    >
      {children}
    </div>
  );
}
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface GridProps {
  children: ReactNode;
  className?: string;
}

export default function Grid({ children, className }: GridProps) {
  return (
    <div className={cn("grid grid-cols-12 gap-3 items-start", className)}>
      {children}
    </div>
  );
}

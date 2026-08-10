import type {ReactNode} from "react";

interface GridProps {
  children: ReactNode;
  columns?: number;
  rows?: number;
  gap?: number;
  className?: string;
}

export default function Grid({
                               children,
                               columns = 1,
                               rows = 1,
                               gap = 4,
                               className = "",
                             }: GridProps) {
  return (
    <div
      className={`grid grid-cols-${columns} grid-rows-${rows} gap-${gap} ${className}`}
    >
      {children}
    </div>
  );
}
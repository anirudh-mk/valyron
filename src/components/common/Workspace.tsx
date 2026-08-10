import type {ReactNode} from "react";

interface WorkspaceProps {
  children: ReactNode;
}

export default function Workspace({children}: WorkspaceProps) {
  return (
    <div className="p-4 space-y-4">
      {children}
    </div>
  );
}
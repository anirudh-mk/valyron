import React from "react";
import { Button } from "@/components/base/button";

interface ActionButtonProps {
  label: string;
  icon?: React.ElementType;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export default function ActionButton({
  label,
  icon: Icon,
  onClick,
  disabled,
  className = "",
}: ActionButtonProps) {
  return (
    <Button
      size="sm"
      onClick={onClick}
      disabled={disabled}
      className={`h-6 px-3.5 text-[11px] bg-blue-600 hover:bg-blue-700 text-white rounded-sm font-medium shadow-sm ${className}`}
    >
      {Icon && <Icon className="h-3 w-3 mr-1.5" />}
      {label}
    </Button>
  );
}
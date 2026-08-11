import type { ReactNode } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";

interface InputIconButtonProps {
  id: string;
  placeholder?: string;
  required?: boolean;
  icon: ReactNode;
  ariaLabel: string;
  onClick?: () => void;
}

export default function InputIconButton({
                                          id,
                                          placeholder,
                                          required = false,
                                          icon,
                                          ariaLabel,
                                          onClick,
                                        }: InputIconButtonProps) {
  return (
    <ButtonGroup>
      <Input
        id={id}
        placeholder={placeholder}
        required={required}
      />

      <Button
        type="button"
        variant="outline"
        size="icon"
        aria-label={ariaLabel}
        onClick={onClick}
      >
        {icon}
      </Button>
    </ButtonGroup>
  );
}
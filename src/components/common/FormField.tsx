import type {ReactNode} from "react";
import {Field, FieldLabel} from "@/components/ui/field";

interface FormFieldProps {
  label: string;
  htmlFor?: string;
  required?: boolean;
  children: ReactNode;
}

export default function FormField({
                                    label,
                                    htmlFor,
                                    required = false,
                                    children,
                                  }: FormFieldProps) {
  return (
    <Field>
      <FieldLabel htmlFor={htmlFor}>
        {label}
        {required && (
          <span className="text-destructive">*</span>
        )}
      </FieldLabel>

      {children}
    </Field>
  );
}
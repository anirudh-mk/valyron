import * as React from "react"
import {Label} from "@/components/ui/label"
import {cn} from "@/lib/utils"

interface FormFieldProps {
  htmlFor?: string
  label: string
  required?: boolean
  className?: string
  children: React.ReactNode
}

function FormField({
                     htmlFor,
                     label,
                     required = false,
                     className,
                     children,
                   }: FormFieldProps) {
  return (
    <div className="space-y-2">
      <Label
        htmlFor={htmlFor}
        className={cn("text-sm font-medium", className)}
      >
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </Label>

      {children}
    </div>
  )
}

export {FormField}
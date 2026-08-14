import * as React from "react"
import * as UI from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef<
  React.ComponentRef<typeof UI.Checkbox>,
  React.ComponentPropsWithoutRef<typeof UI.Checkbox>
>(({ className, ...props }, ref) => {
  return (
    <UI.Checkbox
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
Checkbox.displayName = "Checkbox"

export { Checkbox }

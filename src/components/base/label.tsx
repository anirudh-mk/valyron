import * as React from "react"
import * as UI from "@/components/ui/label"
import { cn } from "@/lib/utils"

const Label = React.forwardRef<
  React.ComponentRef<typeof UI.Label>,
  React.ComponentPropsWithoutRef<typeof UI.Label>
>(({ className, ...props }, ref) => {
  return (
    <UI.Label
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
Label.displayName = "Label"

export { Label }

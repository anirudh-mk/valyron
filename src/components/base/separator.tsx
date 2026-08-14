import * as React from "react"
import * as UI from "@/components/ui/separator"
import { cn } from "@/lib/utils"

const Separator = React.forwardRef<
  React.ComponentRef<typeof UI.Separator>,
  React.ComponentPropsWithoutRef<typeof UI.Separator>
>(({ className, ...props }, ref) => {
  return (
    <UI.Separator
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
Separator.displayName = "Separator"

export { Separator }

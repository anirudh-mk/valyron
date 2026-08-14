import * as React from "react"
import * as UI from "@/components/ui/switch"
import { cn } from "@/lib/utils"

const Switch = React.forwardRef<
  React.ComponentRef<typeof UI.Switch>,
  React.ComponentPropsWithoutRef<typeof UI.Switch>
>(({ className, ...props }, ref) => {
  return (
    <UI.Switch
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
Switch.displayName = "Switch"

export { Switch }

import * as React from "react"
import * as UI from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const Badge = React.forwardRef<
  React.ComponentRef<typeof UI.Badge>,
  React.ComponentPropsWithoutRef<typeof UI.Badge>
>(({ className, ...props }, ref) => {
  return (
    <UI.Badge
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
Badge.displayName = "Badge"

const badgeVariants = UI.badgeVariants

export { Badge, badgeVariants }

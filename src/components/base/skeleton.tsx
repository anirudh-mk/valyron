import * as React from "react"
import * as UI from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

const Skeleton = React.forwardRef<
  React.ComponentRef<typeof UI.Skeleton>,
  React.ComponentPropsWithoutRef<typeof UI.Skeleton>
>(({ className, ...props }, ref) => {
  return (
    <UI.Skeleton
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
Skeleton.displayName = "Skeleton"

export { Skeleton }

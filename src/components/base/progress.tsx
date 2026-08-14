import * as React from "react"
import * as UI from "@/components/ui/progress"
import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  React.ComponentRef<typeof UI.Progress>,
  React.ComponentPropsWithoutRef<typeof UI.Progress>
>(({ className, ...props }, ref) => {
  return (
    <UI.Progress
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
Progress.displayName = "Progress"

export { Progress }

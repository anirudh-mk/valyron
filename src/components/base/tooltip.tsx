import * as React from "react"
import * as UI from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

const Tooltip = UI.Tooltip

const TooltipTrigger = React.forwardRef<
  React.ComponentRef<typeof UI.TooltipTrigger>,
  React.ComponentPropsWithoutRef<typeof UI.TooltipTrigger>
>((props, ref) => {
  return (
    <UI.TooltipTrigger
      ref={ref}
      {...props}
    />
  )
})
TooltipTrigger.displayName = "TooltipTrigger"

const TooltipContent = React.forwardRef<
  React.ComponentRef<typeof UI.TooltipContent>,
  React.ComponentPropsWithoutRef<typeof UI.TooltipContent>
>(({ className, ...props }, ref) => {
  return (
    <UI.TooltipContent
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
TooltipContent.displayName = "TooltipContent"

const TooltipProvider = UI.TooltipProvider

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }

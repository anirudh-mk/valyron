import * as React from "react"
import * as UI from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

const Tooltip = React.forwardRef<
  React.ComponentRef<typeof UI.Tooltip>,
  React.ComponentPropsWithoutRef<typeof UI.Tooltip>
>((props, ref) => {
  return (
    <UI.Tooltip
      ref={ref}
      {...props}
    />
  )
})
Tooltip.displayName = "Tooltip"

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

const TooltipProvider = React.forwardRef<
  React.ComponentRef<typeof UI.TooltipProvider>,
  React.ComponentPropsWithoutRef<typeof UI.TooltipProvider>
>((props, ref) => {
  return (
    <UI.TooltipProvider
      ref={ref}
      {...props}
    />
  )
})
TooltipProvider.displayName = "TooltipProvider"

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }

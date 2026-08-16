import * as React from "react"
import * as UI from "@/components/ui/chart"
import { cn } from "@/lib/utils"

const ChartContainer = React.forwardRef<
  React.ComponentRef<typeof UI.ChartContainer>,
  React.ComponentPropsWithoutRef<typeof UI.ChartContainer>
>(({ className, ...props }, ref) => {
  return (
    <UI.ChartContainer
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
ChartContainer.displayName = "ChartContainer"

const ChartTooltip = UI.ChartTooltip

const ChartTooltipContent = React.forwardRef<
  React.ComponentRef<typeof UI.ChartTooltipContent>,
  React.ComponentPropsWithoutRef<typeof UI.ChartTooltipContent>
>(({ className, ...props }, ref) => {
  return (
    <UI.ChartTooltipContent
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
ChartTooltipContent.displayName = "ChartTooltipContent"

const ChartLegend = UI.ChartLegend

const ChartLegendContent = React.forwardRef<
  React.ComponentRef<typeof UI.ChartLegendContent>,
  React.ComponentPropsWithoutRef<typeof UI.ChartLegendContent>
>(({ className, ...props }, ref) => {
  return (
    <UI.ChartLegendContent
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
ChartLegendContent.displayName = "ChartLegendContent"

const ChartStyle = UI.ChartStyle

export type { ChartConfig } from "@/components/ui/chart"

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
}

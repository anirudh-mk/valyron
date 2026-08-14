import * as React from "react"
import * as UI from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"

const RadioGroup = React.forwardRef<
  React.ComponentRef<typeof UI.RadioGroup>,
  React.ComponentPropsWithoutRef<typeof UI.RadioGroup>
>(({ className, ...props }, ref) => {
  return (
    <UI.RadioGroup
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
RadioGroup.displayName = "RadioGroup"

const RadioGroupItem = React.forwardRef<
  React.ComponentRef<typeof UI.RadioGroupItem>,
  React.ComponentPropsWithoutRef<typeof UI.RadioGroupItem>
>(({ className, ...props }, ref) => {
  return (
    <UI.RadioGroupItem
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
RadioGroupItem.displayName = "RadioGroupItem"

export { RadioGroup, RadioGroupItem }

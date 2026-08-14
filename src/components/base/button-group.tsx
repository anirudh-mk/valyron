import * as React from "react"
import * as UI from "@/components/ui/button-group"
import { cn } from "@/lib/utils"

const ButtonGroup = React.forwardRef<
  React.ComponentRef<typeof UI.ButtonGroup>,
  React.ComponentPropsWithoutRef<typeof UI.ButtonGroup>
>(({ className, ...props }, ref) => {
  return (
    <UI.ButtonGroup
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
ButtonGroup.displayName = "ButtonGroup"

const ButtonGroupSeparator = React.forwardRef<
  React.ComponentRef<typeof UI.ButtonGroupSeparator>,
  React.ComponentPropsWithoutRef<typeof UI.ButtonGroupSeparator>
>(({ className, ...props }, ref) => {
  return (
    <UI.ButtonGroupSeparator
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
ButtonGroupSeparator.displayName = "ButtonGroupSeparator"

const ButtonGroupText = React.forwardRef<
  React.ComponentRef<typeof UI.ButtonGroupText>,
  React.ComponentPropsWithoutRef<typeof UI.ButtonGroupText>
>(({ className, ...props }, ref) => {
  return (
    <UI.ButtonGroupText
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
ButtonGroupText.displayName = "ButtonGroupText"

const buttonGroupVariants = UI.buttonGroupVariants

export { ButtonGroup, ButtonGroupSeparator, ButtonGroupText, buttonGroupVariants }

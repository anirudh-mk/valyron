import * as React from "react"
import * as UI from "@/components/ui/input-group"
import {cn} from "@/lib/utils"

const InputGroup = React.forwardRef<
  React.ComponentRef<typeof UI.InputGroup>,
  React.ComponentPropsWithoutRef<typeof UI.InputGroup>
>(({className, ...props}, ref) => {
  return (
    <UI.InputGroup
      ref={ref}
      className={cn(
        "rounded-md",
        "has-[[data-slot=input-group-control]:focus-visible]:border-border",
        "has-[[data-slot=input-group-control]:focus-visible]:ring-0", className)}
      {...props}
    />
  )
})
InputGroup.displayName = "InputGroup"

const InputGroupAddon = React.forwardRef<
  React.ComponentRef<typeof UI.InputGroupAddon>,
  React.ComponentPropsWithoutRef<typeof UI.InputGroupAddon>
>(({className, ...props}, ref) => {
  return (
    <UI.InputGroupAddon
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
InputGroupAddon.displayName = "InputGroupAddon"

const InputGroupButton = React.forwardRef<
  React.ComponentRef<typeof UI.InputGroupButton>,
  React.ComponentPropsWithoutRef<typeof UI.InputGroupButton>
>(({className, ...props}, ref) => {
  return (
    <UI.InputGroupButton
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
InputGroupButton.displayName = "InputGroupButton"

const InputGroupText = React.forwardRef<
  React.ComponentRef<typeof UI.InputGroupText>,
  React.ComponentPropsWithoutRef<typeof UI.InputGroupText>
>(({className, ...props}, ref) => {
  return (
    <UI.InputGroupText
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
InputGroupText.displayName = "InputGroupText"

const InputGroupInput = React.forwardRef<
  React.ComponentRef<typeof UI.InputGroupInput>,
  React.ComponentPropsWithoutRef<typeof UI.InputGroupInput>
>(({className, ...props}, ref) => {
  return (
    <UI.InputGroupInput
      ref={ref}
      className={cn(
        "rounded-sm",
        "focus-visible:border-transparent",
        "focus-visible:ring-0",
        "focus-visible:ring-offset-0",
        className)}
      {...props}
    />
  )
})
InputGroupInput.displayName = "InputGroupInput"

const InputGroupTextarea = React.forwardRef<
  React.ComponentRef<typeof UI.InputGroupTextarea>,
  React.ComponentPropsWithoutRef<typeof UI.InputGroupTextarea>
>(({className, ...props}, ref) => {
  return (
    <UI.InputGroupTextarea
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
InputGroupTextarea.displayName = "InputGroupTextarea"

export {InputGroup, InputGroupAddon, InputGroupButton, InputGroupText, InputGroupInput, InputGroupTextarea}

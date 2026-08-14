import * as React from "react"
import * as UI from "@/components/ui/select"
import { cn } from "@/lib/utils"

const Select = UI.Select

const SelectContent = React.forwardRef<
  React.ComponentRef<typeof UI.SelectContent>,
  React.ComponentPropsWithoutRef<typeof UI.SelectContent>
>(({ className, ...props }, ref) => {
  return (
    <UI.SelectContent
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
SelectContent.displayName = "SelectContent"

const SelectGroup = React.forwardRef<
  React.ComponentRef<typeof UI.SelectGroup>,
  React.ComponentPropsWithoutRef<typeof UI.SelectGroup>
>((props, ref) => {
  return (
    <UI.SelectGroup
      ref={ref}
      {...props}
    />
  )
})
SelectGroup.displayName = "SelectGroup"

const SelectItem = React.forwardRef<
  React.ComponentRef<typeof UI.SelectItem>,
  React.ComponentPropsWithoutRef<typeof UI.SelectItem>
>(({ className, ...props }, ref) => {
  return (
    <UI.SelectItem
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
SelectItem.displayName = "SelectItem"

const SelectLabel = React.forwardRef<
  React.ComponentRef<typeof UI.SelectLabel>,
  React.ComponentPropsWithoutRef<typeof UI.SelectLabel>
>(({ className, ...props }, ref) => {
  return (
    <UI.SelectLabel
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
SelectLabel.displayName = "SelectLabel"

const SelectScrollDownButton = React.forwardRef<
  React.ComponentRef<typeof UI.SelectScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof UI.SelectScrollDownButton>
>(({ className, ...props }, ref) => {
  return (
    <UI.SelectScrollDownButton
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
SelectScrollDownButton.displayName = "SelectScrollDownButton"

const SelectScrollUpButton = React.forwardRef<
  React.ComponentRef<typeof UI.SelectScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof UI.SelectScrollUpButton>
>(({ className, ...props }, ref) => {
  return (
    <UI.SelectScrollUpButton
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
SelectScrollUpButton.displayName = "SelectScrollUpButton"

const SelectSeparator = React.forwardRef<
  React.ComponentRef<typeof UI.SelectSeparator>,
  React.ComponentPropsWithoutRef<typeof UI.SelectSeparator>
>(({ className, ...props }, ref) => {
  return (
    <UI.SelectSeparator
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
SelectSeparator.displayName = "SelectSeparator"

const SelectTrigger = React.forwardRef<
  React.ComponentRef<typeof UI.SelectTrigger>,
  React.ComponentPropsWithoutRef<typeof UI.SelectTrigger>
>(({ className, ...props }, ref) => {
  return (
    <UI.SelectTrigger
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
SelectTrigger.displayName = "SelectTrigger"

const SelectValue = React.forwardRef<
  React.ComponentRef<typeof UI.SelectValue>,
  React.ComponentPropsWithoutRef<typeof UI.SelectValue>
>((props, ref) => {
  return (
    <UI.SelectValue
      ref={ref}
      {...props}
    />
  )
})
SelectValue.displayName = "SelectValue"

export { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectTrigger, SelectValue }

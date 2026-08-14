import * as React from "react"
import * as UI from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

const DropdownMenu = UI.DropdownMenu

const DropdownMenuPortal = UI.DropdownMenuPortal

const DropdownMenuTrigger = React.forwardRef<
  React.ComponentRef<typeof UI.DropdownMenuTrigger>,
  React.ComponentPropsWithoutRef<typeof UI.DropdownMenuTrigger>
>((props, ref) => {
  return (
    <UI.DropdownMenuTrigger
      ref={ref}
      {...props}
    />
  )
})
DropdownMenuTrigger.displayName = "DropdownMenuTrigger"

const DropdownMenuContent = React.forwardRef<
  React.ComponentRef<typeof UI.DropdownMenuContent>,
  React.ComponentPropsWithoutRef<typeof UI.DropdownMenuContent>
>(({ className, ...props }, ref) => {
  return (
    <UI.DropdownMenuContent
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
DropdownMenuContent.displayName = "DropdownMenuContent"

const DropdownMenuGroup = React.forwardRef<
  React.ComponentRef<typeof UI.DropdownMenuGroup>,
  React.ComponentPropsWithoutRef<typeof UI.DropdownMenuGroup>
>((props, ref) => {
  return (
    <UI.DropdownMenuGroup
      ref={ref}
      {...props}
    />
  )
})
DropdownMenuGroup.displayName = "DropdownMenuGroup"

const DropdownMenuLabel = React.forwardRef<
  React.ComponentRef<typeof UI.DropdownMenuLabel>,
  React.ComponentPropsWithoutRef<typeof UI.DropdownMenuLabel>
>(({ className, ...props }, ref) => {
  return (
    <UI.DropdownMenuLabel
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
DropdownMenuLabel.displayName = "DropdownMenuLabel"

const DropdownMenuItem = React.forwardRef<
  React.ComponentRef<typeof UI.DropdownMenuItem>,
  React.ComponentPropsWithoutRef<typeof UI.DropdownMenuItem>
>(({ className, ...props }, ref) => {
  return (
    <UI.DropdownMenuItem
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
DropdownMenuItem.displayName = "DropdownMenuItem"

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ComponentRef<typeof UI.DropdownMenuCheckboxItem>,
  React.ComponentPropsWithoutRef<typeof UI.DropdownMenuCheckboxItem>
>(({ className, ...props }, ref) => {
  return (
    <UI.DropdownMenuCheckboxItem
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
DropdownMenuCheckboxItem.displayName = "DropdownMenuCheckboxItem"

const DropdownMenuRadioGroup = React.forwardRef<
  React.ComponentRef<typeof UI.DropdownMenuRadioGroup>,
  React.ComponentPropsWithoutRef<typeof UI.DropdownMenuRadioGroup>
>((props, ref) => {
  return (
    <UI.DropdownMenuRadioGroup
      ref={ref}
      {...props}
    />
  )
})
DropdownMenuRadioGroup.displayName = "DropdownMenuRadioGroup"

const DropdownMenuRadioItem = React.forwardRef<
  React.ComponentRef<typeof UI.DropdownMenuRadioItem>,
  React.ComponentPropsWithoutRef<typeof UI.DropdownMenuRadioItem>
>(({ className, ...props }, ref) => {
  return (
    <UI.DropdownMenuRadioItem
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
DropdownMenuRadioItem.displayName = "DropdownMenuRadioItem"

const DropdownMenuSeparator = React.forwardRef<
  React.ComponentRef<typeof UI.DropdownMenuSeparator>,
  React.ComponentPropsWithoutRef<typeof UI.DropdownMenuSeparator>
>(({ className, ...props }, ref) => {
  return (
    <UI.DropdownMenuSeparator
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
DropdownMenuSeparator.displayName = "DropdownMenuSeparator"

const DropdownMenuShortcut = React.forwardRef<
  React.ComponentRef<typeof UI.DropdownMenuShortcut>,
  React.ComponentPropsWithoutRef<typeof UI.DropdownMenuShortcut>
>(({ className, ...props }, ref) => {
  return (
    <UI.DropdownMenuShortcut
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
DropdownMenuShortcut.displayName = "DropdownMenuShortcut"

const DropdownMenuSub = UI.DropdownMenuSub

const DropdownMenuSubTrigger = React.forwardRef<
  React.ComponentRef<typeof UI.DropdownMenuSubTrigger>,
  React.ComponentPropsWithoutRef<typeof UI.DropdownMenuSubTrigger>
>(({ className, ...props }, ref) => {
  return (
    <UI.DropdownMenuSubTrigger
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
DropdownMenuSubTrigger.displayName = "DropdownMenuSubTrigger"

const DropdownMenuSubContent = React.forwardRef<
  React.ComponentRef<typeof UI.DropdownMenuSubContent>,
  React.ComponentPropsWithoutRef<typeof UI.DropdownMenuSubContent>
>(({ className, ...props }, ref) => {
  return (
    <UI.DropdownMenuSubContent
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
DropdownMenuSubContent.displayName = "DropdownMenuSubContent"

export { DropdownMenu, DropdownMenuPortal, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuItem, DropdownMenuCheckboxItem, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent }

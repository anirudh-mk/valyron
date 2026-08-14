import * as React from "react"
import * as UI from "@/components/ui/command"
import { cn } from "@/lib/utils"

const Command = React.forwardRef<
  React.ComponentRef<typeof UI.Command>,
  React.ComponentPropsWithoutRef<typeof UI.Command>
>(({ className, ...props }, ref) => {
  return (
    <UI.Command
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
Command.displayName = "Command"

const CommandDialog = React.forwardRef<
  React.ComponentRef<typeof UI.CommandDialog>,
  React.ComponentPropsWithoutRef<typeof UI.CommandDialog>
>(({ className, ...props }, ref) => {
  return (
    <UI.CommandDialog
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
CommandDialog.displayName = "CommandDialog"

const CommandInput = React.forwardRef<
  React.ComponentRef<typeof UI.CommandInput>,
  React.ComponentPropsWithoutRef<typeof UI.CommandInput>
>(({ className, ...props }, ref) => {
  return (
    <UI.CommandInput
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
CommandInput.displayName = "CommandInput"

const CommandList = React.forwardRef<
  React.ComponentRef<typeof UI.CommandList>,
  React.ComponentPropsWithoutRef<typeof UI.CommandList>
>(({ className, ...props }, ref) => {
  return (
    <UI.CommandList
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
CommandList.displayName = "CommandList"

const CommandEmpty = React.forwardRef<
  React.ComponentRef<typeof UI.CommandEmpty>,
  React.ComponentPropsWithoutRef<typeof UI.CommandEmpty>
>((props, ref) => {
  return (
    <UI.CommandEmpty
      ref={ref}
      {...props}
    />
  )
})
CommandEmpty.displayName = "CommandEmpty"

const CommandGroup = React.forwardRef<
  React.ComponentRef<typeof UI.CommandGroup>,
  React.ComponentPropsWithoutRef<typeof UI.CommandGroup>
>(({ className, ...props }, ref) => {
  return (
    <UI.CommandGroup
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
CommandGroup.displayName = "CommandGroup"

const CommandItem = React.forwardRef<
  React.ComponentRef<typeof UI.CommandItem>,
  React.ComponentPropsWithoutRef<typeof UI.CommandItem>
>(({ className, ...props }, ref) => {
  return (
    <UI.CommandItem
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
CommandItem.displayName = "CommandItem"

const CommandShortcut = React.forwardRef<
  React.ComponentRef<typeof UI.CommandShortcut>,
  React.ComponentPropsWithoutRef<typeof UI.CommandShortcut>
>(({ className, ...props }, ref) => {
  return (
    <UI.CommandShortcut
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
CommandShortcut.displayName = "CommandShortcut"

const CommandSeparator = React.forwardRef<
  React.ComponentRef<typeof UI.CommandSeparator>,
  React.ComponentPropsWithoutRef<typeof UI.CommandSeparator>
>(({ className, ...props }, ref) => {
  return (
    <UI.CommandSeparator
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
CommandSeparator.displayName = "CommandSeparator"

export { Command, CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandShortcut, CommandSeparator }

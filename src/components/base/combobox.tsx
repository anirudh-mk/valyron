import * as React from "react"
import * as UI from "@/components/ui/combobox"
import { cn } from "@/lib/utils"

const Combobox = UI.Combobox

const ComboboxInput = React.forwardRef<
  React.ComponentRef<typeof UI.ComboboxInput>,
  React.ComponentPropsWithoutRef<typeof UI.ComboboxInput>
>(({ className, ...props }, ref) => {
  return (
    <UI.ComboboxInput
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
ComboboxInput.displayName = "ComboboxInput"

const ComboboxContent = React.forwardRef<
  React.ComponentRef<typeof UI.ComboboxContent>,
  React.ComponentPropsWithoutRef<typeof UI.ComboboxContent>
>(({ className, ...props }, ref) => {
  return (
    <UI.ComboboxContent
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
ComboboxContent.displayName = "ComboboxContent"

const ComboboxList = React.forwardRef<
  React.ComponentRef<typeof UI.ComboboxList>,
  React.ComponentPropsWithoutRef<typeof UI.ComboboxList>
>(({ className, ...props }, ref) => {
  return (
    <UI.ComboboxList
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
ComboboxList.displayName = "ComboboxList"

const ComboboxItem = React.forwardRef<
  React.ComponentRef<typeof UI.ComboboxItem>,
  React.ComponentPropsWithoutRef<typeof UI.ComboboxItem>
>(({ className, ...props }, ref) => {
  return (
    <UI.ComboboxItem
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
ComboboxItem.displayName = "ComboboxItem"

const ComboboxGroup = React.forwardRef<
  React.ComponentRef<typeof UI.ComboboxGroup>,
  React.ComponentPropsWithoutRef<typeof UI.ComboboxGroup>
>(({ className, ...props }, ref) => {
  return (
    <UI.ComboboxGroup
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
ComboboxGroup.displayName = "ComboboxGroup"

const ComboboxLabel = React.forwardRef<
  React.ComponentRef<typeof UI.ComboboxLabel>,
  React.ComponentPropsWithoutRef<typeof UI.ComboboxLabel>
>(({ className, ...props }, ref) => {
  return (
    <UI.ComboboxLabel
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
ComboboxLabel.displayName = "ComboboxLabel"

const ComboboxCollection = UI.ComboboxCollection

const ComboboxEmpty = React.forwardRef<
  React.ComponentRef<typeof UI.ComboboxEmpty>,
  React.ComponentPropsWithoutRef<typeof UI.ComboboxEmpty>
>(({ className, ...props }, ref) => {
  return (
    <UI.ComboboxEmpty
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
ComboboxEmpty.displayName = "ComboboxEmpty"

const ComboboxSeparator = React.forwardRef<
  React.ComponentRef<typeof UI.ComboboxSeparator>,
  React.ComponentPropsWithoutRef<typeof UI.ComboboxSeparator>
>(({ className, ...props }, ref) => {
  return (
    <UI.ComboboxSeparator
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
ComboboxSeparator.displayName = "ComboboxSeparator"

const ComboboxChips = React.forwardRef<
  React.ComponentRef<typeof UI.ComboboxChips>,
  React.ComponentPropsWithoutRef<typeof UI.ComboboxChips>
>(({ className, ...props }, ref) => {
  return (
    <UI.ComboboxChips
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
ComboboxChips.displayName = "ComboboxChips"

const ComboboxChip = React.forwardRef<
  React.ComponentRef<typeof UI.ComboboxChip>,
  React.ComponentPropsWithoutRef<typeof UI.ComboboxChip>
>(({ className, ...props }, ref) => {
  return (
    <UI.ComboboxChip
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
ComboboxChip.displayName = "ComboboxChip"

const ComboboxChipsInput = React.forwardRef<
  React.ComponentRef<typeof UI.ComboboxChipsInput>,
  React.ComponentPropsWithoutRef<typeof UI.ComboboxChipsInput>
>(({ className, ...props }, ref) => {
  return (
    <UI.ComboboxChipsInput
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
ComboboxChipsInput.displayName = "ComboboxChipsInput"

const ComboboxTrigger = React.forwardRef<
  React.ComponentRef<typeof UI.ComboboxTrigger>,
  React.ComponentPropsWithoutRef<typeof UI.ComboboxTrigger>
>(({ className, ...props }, ref) => {
  return (
    <UI.ComboboxTrigger
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
ComboboxTrigger.displayName = "ComboboxTrigger"

const ComboboxValue = UI.ComboboxValue

const useComboboxAnchor = UI.useComboboxAnchor

export { Combobox, ComboboxInput, ComboboxContent, ComboboxList, ComboboxItem, ComboboxGroup, ComboboxLabel, ComboboxCollection, ComboboxEmpty, ComboboxSeparator, ComboboxChips, ComboboxChip, ComboboxChipsInput, ComboboxTrigger, ComboboxValue, useComboboxAnchor }

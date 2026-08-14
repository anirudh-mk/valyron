import * as React from "react"
import * as UI from "@/components/ui/popover"
import { cn } from "@/lib/utils"

const Popover = UI.Popover

const PopoverTrigger = React.forwardRef<
  React.ComponentRef<typeof UI.PopoverTrigger>,
  React.ComponentPropsWithoutRef<typeof UI.PopoverTrigger>
>((props, ref) => {
  return (
    <UI.PopoverTrigger
      ref={ref}
      {...props}
    />
  )
})
PopoverTrigger.displayName = "PopoverTrigger"

const PopoverContent = React.forwardRef<
  React.ComponentRef<typeof UI.PopoverContent>,
  React.ComponentPropsWithoutRef<typeof UI.PopoverContent>
>(({ className, ...props }, ref) => {
  return (
    <UI.PopoverContent
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
PopoverContent.displayName = "PopoverContent"

const PopoverAnchor = React.forwardRef<
  React.ComponentRef<typeof UI.PopoverAnchor>,
  React.ComponentPropsWithoutRef<typeof UI.PopoverAnchor>
>((props, ref) => {
  return (
    <UI.PopoverAnchor
      ref={ref}
      {...props}
    />
  )
})
PopoverAnchor.displayName = "PopoverAnchor"

const PopoverHeader = React.forwardRef<
  React.ComponentRef<typeof UI.PopoverHeader>,
  React.ComponentPropsWithoutRef<typeof UI.PopoverHeader>
>(({ className, ...props }, ref) => {
  return (
    <UI.PopoverHeader
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
PopoverHeader.displayName = "PopoverHeader"

const PopoverTitle = React.forwardRef<
  React.ComponentRef<typeof UI.PopoverTitle>,
  React.ComponentPropsWithoutRef<typeof UI.PopoverTitle>
>(({ className, ...props }, ref) => {
  return (
    <UI.PopoverTitle
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
PopoverTitle.displayName = "PopoverTitle"

const PopoverDescription = React.forwardRef<
  React.ComponentRef<typeof UI.PopoverDescription>,
  React.ComponentPropsWithoutRef<typeof UI.PopoverDescription>
>(({ className, ...props }, ref) => {
  return (
    <UI.PopoverDescription
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
PopoverDescription.displayName = "PopoverDescription"

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor, PopoverHeader, PopoverTitle, PopoverDescription }

import * as React from "react"
import * as UI from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

const Sheet = React.forwardRef<
  React.ComponentRef<typeof UI.Sheet>,
  React.ComponentPropsWithoutRef<typeof UI.Sheet>
>((props, ref) => {
  return (
    <UI.Sheet
      ref={ref}
      {...props}
    />
  )
})
Sheet.displayName = "Sheet"

const SheetTrigger = React.forwardRef<
  React.ComponentRef<typeof UI.SheetTrigger>,
  React.ComponentPropsWithoutRef<typeof UI.SheetTrigger>
>((props, ref) => {
  return (
    <UI.SheetTrigger
      ref={ref}
      {...props}
    />
  )
})
SheetTrigger.displayName = "SheetTrigger"

const SheetClose = React.forwardRef<
  React.ComponentRef<typeof UI.SheetClose>,
  React.ComponentPropsWithoutRef<typeof UI.SheetClose>
>((props, ref) => {
  return (
    <UI.SheetClose
      ref={ref}
      {...props}
    />
  )
})
SheetClose.displayName = "SheetClose"

const SheetContent = React.forwardRef<
  React.ComponentRef<typeof UI.SheetContent>,
  React.ComponentPropsWithoutRef<typeof UI.SheetContent>
>(({ className, ...props }, ref) => {
  return (
    <UI.SheetContent
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
SheetContent.displayName = "SheetContent"

const SheetHeader = React.forwardRef<
  React.ComponentRef<typeof UI.SheetHeader>,
  React.ComponentPropsWithoutRef<typeof UI.SheetHeader>
>(({ className, ...props }, ref) => {
  return (
    <UI.SheetHeader
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
SheetHeader.displayName = "SheetHeader"

const SheetFooter = React.forwardRef<
  React.ComponentRef<typeof UI.SheetFooter>,
  React.ComponentPropsWithoutRef<typeof UI.SheetFooter>
>(({ className, ...props }, ref) => {
  return (
    <UI.SheetFooter
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
SheetFooter.displayName = "SheetFooter"

const SheetTitle = React.forwardRef<
  React.ComponentRef<typeof UI.SheetTitle>,
  React.ComponentPropsWithoutRef<typeof UI.SheetTitle>
>(({ className, ...props }, ref) => {
  return (
    <UI.SheetTitle
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
SheetTitle.displayName = "SheetTitle"

const SheetDescription = React.forwardRef<
  React.ComponentRef<typeof UI.SheetDescription>,
  React.ComponentPropsWithoutRef<typeof UI.SheetDescription>
>(({ className, ...props }, ref) => {
  return (
    <UI.SheetDescription
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
SheetDescription.displayName = "SheetDescription"

export { Sheet, SheetTrigger, SheetClose, SheetContent, SheetHeader, SheetFooter, SheetTitle, SheetDescription }

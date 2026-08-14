import * as React from "react"
import * as UI from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

const Dialog = React.forwardRef<
  React.ComponentRef<typeof UI.Dialog>,
  React.ComponentPropsWithoutRef<typeof UI.Dialog>
>((props, ref) => {
  return (
    <UI.Dialog
      ref={ref}
      {...props}
    />
  )
})
Dialog.displayName = "Dialog"

const DialogClose = React.forwardRef<
  React.ComponentRef<typeof UI.DialogClose>,
  React.ComponentPropsWithoutRef<typeof UI.DialogClose>
>((props, ref) => {
  return (
    <UI.DialogClose
      ref={ref}
      {...props}
    />
  )
})
DialogClose.displayName = "DialogClose"

const DialogContent = React.forwardRef<
  React.ComponentRef<typeof UI.DialogContent>,
  React.ComponentPropsWithoutRef<typeof UI.DialogContent>
>(({ className, ...props }, ref) => {
  return (
    <UI.DialogContent
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
DialogContent.displayName = "DialogContent"

const DialogDescription = React.forwardRef<
  React.ComponentRef<typeof UI.DialogDescription>,
  React.ComponentPropsWithoutRef<typeof UI.DialogDescription>
>(({ className, ...props }, ref) => {
  return (
    <UI.DialogDescription
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
DialogDescription.displayName = "DialogDescription"

const DialogFooter = React.forwardRef<
  React.ComponentRef<typeof UI.DialogFooter>,
  React.ComponentPropsWithoutRef<typeof UI.DialogFooter>
>(({ className, ...props }, ref) => {
  return (
    <UI.DialogFooter
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
DialogFooter.displayName = "DialogFooter"

const DialogHeader = React.forwardRef<
  React.ComponentRef<typeof UI.DialogHeader>,
  React.ComponentPropsWithoutRef<typeof UI.DialogHeader>
>(({ className, ...props }, ref) => {
  return (
    <UI.DialogHeader
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
DialogHeader.displayName = "DialogHeader"

const DialogOverlay = React.forwardRef<
  React.ComponentRef<typeof UI.DialogOverlay>,
  React.ComponentPropsWithoutRef<typeof UI.DialogOverlay>
>(({ className, ...props }, ref) => {
  return (
    <UI.DialogOverlay
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
DialogOverlay.displayName = "DialogOverlay"

const DialogPortal = React.forwardRef<
  React.ComponentRef<typeof UI.DialogPortal>,
  React.ComponentPropsWithoutRef<typeof UI.DialogPortal>
>((props, ref) => {
  return (
    <UI.DialogPortal
      ref={ref}
      {...props}
    />
  )
})
DialogPortal.displayName = "DialogPortal"

const DialogTitle = React.forwardRef<
  React.ComponentRef<typeof UI.DialogTitle>,
  React.ComponentPropsWithoutRef<typeof UI.DialogTitle>
>(({ className, ...props }, ref) => {
  return (
    <UI.DialogTitle
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
DialogTitle.displayName = "DialogTitle"

const DialogTrigger = React.forwardRef<
  React.ComponentRef<typeof UI.DialogTrigger>,
  React.ComponentPropsWithoutRef<typeof UI.DialogTrigger>
>((props, ref) => {
  return (
    <UI.DialogTrigger
      ref={ref}
      {...props}
    />
  )
})
DialogTrigger.displayName = "DialogTrigger"

export { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger }

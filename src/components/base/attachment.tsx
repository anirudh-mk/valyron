import * as React from "react"
import * as UI from "@/components/ui/attachment"
import { cn } from "@/lib/utils"

const Attachment = React.forwardRef<
  React.ComponentRef<typeof UI.Attachment>,
  React.ComponentPropsWithoutRef<typeof UI.Attachment>
>(({ className, ...props }, ref) => {
  return (
    <UI.Attachment
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
Attachment.displayName = "Attachment"

const AttachmentGroup = React.forwardRef<
  React.ComponentRef<typeof UI.AttachmentGroup>,
  React.ComponentPropsWithoutRef<typeof UI.AttachmentGroup>
>(({ className, ...props }, ref) => {
  return (
    <UI.AttachmentGroup
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
AttachmentGroup.displayName = "AttachmentGroup"

const AttachmentMedia = React.forwardRef<
  React.ComponentRef<typeof UI.AttachmentMedia>,
  React.ComponentPropsWithoutRef<typeof UI.AttachmentMedia>
>(({ className, ...props }, ref) => {
  return (
    <UI.AttachmentMedia
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
AttachmentMedia.displayName = "AttachmentMedia"

const AttachmentContent = React.forwardRef<
  React.ComponentRef<typeof UI.AttachmentContent>,
  React.ComponentPropsWithoutRef<typeof UI.AttachmentContent>
>(({ className, ...props }, ref) => {
  return (
    <UI.AttachmentContent
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
AttachmentContent.displayName = "AttachmentContent"

const AttachmentTitle = React.forwardRef<
  React.ComponentRef<typeof UI.AttachmentTitle>,
  React.ComponentPropsWithoutRef<typeof UI.AttachmentTitle>
>(({ className, ...props }, ref) => {
  return (
    <UI.AttachmentTitle
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
AttachmentTitle.displayName = "AttachmentTitle"

const AttachmentDescription = React.forwardRef<
  React.ComponentRef<typeof UI.AttachmentDescription>,
  React.ComponentPropsWithoutRef<typeof UI.AttachmentDescription>
>(({ className, ...props }, ref) => {
  return (
    <UI.AttachmentDescription
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
AttachmentDescription.displayName = "AttachmentDescription"

const AttachmentActions = React.forwardRef<
  React.ComponentRef<typeof UI.AttachmentActions>,
  React.ComponentPropsWithoutRef<typeof UI.AttachmentActions>
>(({ className, ...props }, ref) => {
  return (
    <UI.AttachmentActions
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
AttachmentActions.displayName = "AttachmentActions"

const AttachmentAction = React.forwardRef<
  React.ComponentRef<typeof UI.AttachmentAction>,
  React.ComponentPropsWithoutRef<typeof UI.AttachmentAction>
>(({ className, ...props }, ref) => {
  return (
    <UI.AttachmentAction
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
AttachmentAction.displayName = "AttachmentAction"

const AttachmentTrigger = React.forwardRef<
  React.ComponentRef<typeof UI.AttachmentTrigger>,
  React.ComponentPropsWithoutRef<typeof UI.AttachmentTrigger>
>(({ className, ...props }, ref) => {
  return (
    <UI.AttachmentTrigger
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
AttachmentTrigger.displayName = "AttachmentTrigger"

export { Attachment, AttachmentGroup, AttachmentMedia, AttachmentContent, AttachmentTitle, AttachmentDescription, AttachmentActions, AttachmentAction, AttachmentTrigger }

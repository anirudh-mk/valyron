import * as React from "react"
import * as UI from "@/components/ui/empty"
import { cn } from "@/lib/utils"

const Empty = React.forwardRef<
  React.ComponentRef<typeof UI.Empty>,
  React.ComponentPropsWithoutRef<typeof UI.Empty>
>(({ className, ...props }, ref) => {
  return (
    <UI.Empty
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
Empty.displayName = "Empty"

const EmptyHeader = React.forwardRef<
  React.ComponentRef<typeof UI.EmptyHeader>,
  React.ComponentPropsWithoutRef<typeof UI.EmptyHeader>
>(({ className, ...props }, ref) => {
  return (
    <UI.EmptyHeader
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
EmptyHeader.displayName = "EmptyHeader"

const EmptyTitle = React.forwardRef<
  React.ComponentRef<typeof UI.EmptyTitle>,
  React.ComponentPropsWithoutRef<typeof UI.EmptyTitle>
>(({ className, ...props }, ref) => {
  return (
    <UI.EmptyTitle
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
EmptyTitle.displayName = "EmptyTitle"

const EmptyDescription = React.forwardRef<
  React.ComponentRef<typeof UI.EmptyDescription>,
  React.ComponentPropsWithoutRef<typeof UI.EmptyDescription>
>(({ className, ...props }, ref) => {
  return (
    <UI.EmptyDescription
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
EmptyDescription.displayName = "EmptyDescription"

const EmptyContent = React.forwardRef<
  React.ComponentRef<typeof UI.EmptyContent>,
  React.ComponentPropsWithoutRef<typeof UI.EmptyContent>
>(({ className, ...props }, ref) => {
  return (
    <UI.EmptyContent
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
EmptyContent.displayName = "EmptyContent"

const EmptyMedia = React.forwardRef<
  React.ComponentRef<typeof UI.EmptyMedia>,
  React.ComponentPropsWithoutRef<typeof UI.EmptyMedia>
>(({ className, ...props }, ref) => {
  return (
    <UI.EmptyMedia
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
EmptyMedia.displayName = "EmptyMedia"

export { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyContent, EmptyMedia }

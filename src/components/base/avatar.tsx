import * as React from "react"
import * as UI from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

const Avatar = React.forwardRef<
  React.ComponentRef<typeof UI.Avatar>,
  React.ComponentPropsWithoutRef<typeof UI.Avatar>
>(({ className, ...props }, ref) => {
  return (
    <UI.Avatar
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
Avatar.displayName = "Avatar"

const AvatarImage = React.forwardRef<
  React.ComponentRef<typeof UI.AvatarImage>,
  React.ComponentPropsWithoutRef<typeof UI.AvatarImage>
>(({ className, ...props }, ref) => {
  return (
    <UI.AvatarImage
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
AvatarImage.displayName = "AvatarImage"

const AvatarFallback = React.forwardRef<
  React.ComponentRef<typeof UI.AvatarFallback>,
  React.ComponentPropsWithoutRef<typeof UI.AvatarFallback>
>(({ className, ...props }, ref) => {
  return (
    <UI.AvatarFallback
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
AvatarFallback.displayName = "AvatarFallback"

const AvatarBadge = React.forwardRef<
  React.ComponentRef<typeof UI.AvatarBadge>,
  React.ComponentPropsWithoutRef<typeof UI.AvatarBadge>
>(({ className, ...props }, ref) => {
  return (
    <UI.AvatarBadge
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
AvatarBadge.displayName = "AvatarBadge"

const AvatarGroup = React.forwardRef<
  React.ComponentRef<typeof UI.AvatarGroup>,
  React.ComponentPropsWithoutRef<typeof UI.AvatarGroup>
>(({ className, ...props }, ref) => {
  return (
    <UI.AvatarGroup
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
AvatarGroup.displayName = "AvatarGroup"

const AvatarGroupCount = React.forwardRef<
  React.ComponentRef<typeof UI.AvatarGroupCount>,
  React.ComponentPropsWithoutRef<typeof UI.AvatarGroupCount>
>(({ className, ...props }, ref) => {
  return (
    <UI.AvatarGroupCount
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
AvatarGroupCount.displayName = "AvatarGroupCount"

export { Avatar, AvatarImage, AvatarFallback, AvatarBadge, AvatarGroup, AvatarGroupCount }

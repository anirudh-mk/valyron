import * as React from "react"
import * as UI from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

const Sidebar = React.forwardRef<
  React.ComponentRef<typeof UI.Sidebar>,
  React.ComponentPropsWithoutRef<typeof UI.Sidebar>
>(({ className, ...props }, ref) => {
  return (
    <UI.Sidebar
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
Sidebar.displayName = "Sidebar"

const SidebarContent = React.forwardRef<
  React.ComponentRef<typeof UI.SidebarContent>,
  React.ComponentPropsWithoutRef<typeof UI.SidebarContent>
>(({ className, ...props }, ref) => {
  return (
    <UI.SidebarContent
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
SidebarContent.displayName = "SidebarContent"

const SidebarFooter = React.forwardRef<
  React.ComponentRef<typeof UI.SidebarFooter>,
  React.ComponentPropsWithoutRef<typeof UI.SidebarFooter>
>(({ className, ...props }, ref) => {
  return (
    <UI.SidebarFooter
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
SidebarFooter.displayName = "SidebarFooter"

const SidebarGroup = React.forwardRef<
  React.ComponentRef<typeof UI.SidebarGroup>,
  React.ComponentPropsWithoutRef<typeof UI.SidebarGroup>
>(({ className, ...props }, ref) => {
  return (
    <UI.SidebarGroup
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
SidebarGroup.displayName = "SidebarGroup"

const SidebarGroupAction = React.forwardRef<
  React.ComponentRef<typeof UI.SidebarGroupAction>,
  React.ComponentPropsWithoutRef<typeof UI.SidebarGroupAction>
>(({ className, ...props }, ref) => {
  return (
    <UI.SidebarGroupAction
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
SidebarGroupAction.displayName = "SidebarGroupAction"

const SidebarGroupContent = React.forwardRef<
  React.ComponentRef<typeof UI.SidebarGroupContent>,
  React.ComponentPropsWithoutRef<typeof UI.SidebarGroupContent>
>(({ className, ...props }, ref) => {
  return (
    <UI.SidebarGroupContent
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
SidebarGroupContent.displayName = "SidebarGroupContent"

const SidebarGroupLabel = React.forwardRef<
  React.ComponentRef<typeof UI.SidebarGroupLabel>,
  React.ComponentPropsWithoutRef<typeof UI.SidebarGroupLabel>
>(({ className, ...props }, ref) => {
  return (
    <UI.SidebarGroupLabel
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
SidebarGroupLabel.displayName = "SidebarGroupLabel"

const SidebarHeader = React.forwardRef<
  React.ComponentRef<typeof UI.SidebarHeader>,
  React.ComponentPropsWithoutRef<typeof UI.SidebarHeader>
>(({ className, ...props }, ref) => {
  return (
    <UI.SidebarHeader
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
SidebarHeader.displayName = "SidebarHeader"

const SidebarInput = React.forwardRef<
  React.ComponentRef<typeof UI.SidebarInput>,
  React.ComponentPropsWithoutRef<typeof UI.SidebarInput>
>(({ className, ...props }, ref) => {
  return (
    <UI.SidebarInput
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
SidebarInput.displayName = "SidebarInput"

const SidebarInset = React.forwardRef<
  React.ComponentRef<typeof UI.SidebarInset>,
  React.ComponentPropsWithoutRef<typeof UI.SidebarInset>
>(({ className, ...props }, ref) => {
  return (
    <UI.SidebarInset
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
SidebarInset.displayName = "SidebarInset"

const SidebarMenu = React.forwardRef<
  React.ComponentRef<typeof UI.SidebarMenu>,
  React.ComponentPropsWithoutRef<typeof UI.SidebarMenu>
>(({ className, ...props }, ref) => {
  return (
    <UI.SidebarMenu
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
SidebarMenu.displayName = "SidebarMenu"

const SidebarMenuAction = React.forwardRef<
  React.ComponentRef<typeof UI.SidebarMenuAction>,
  React.ComponentPropsWithoutRef<typeof UI.SidebarMenuAction>
>(({ className, ...props }, ref) => {
  return (
    <UI.SidebarMenuAction
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
SidebarMenuAction.displayName = "SidebarMenuAction"

const SidebarMenuBadge = React.forwardRef<
  React.ComponentRef<typeof UI.SidebarMenuBadge>,
  React.ComponentPropsWithoutRef<typeof UI.SidebarMenuBadge>
>(({ className, ...props }, ref) => {
  return (
    <UI.SidebarMenuBadge
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
SidebarMenuBadge.displayName = "SidebarMenuBadge"

const SidebarMenuButton = React.forwardRef<
  React.ComponentRef<typeof UI.SidebarMenuButton>,
  React.ComponentPropsWithoutRef<typeof UI.SidebarMenuButton>
>(({ className, ...props }, ref) => {
  return (
    <UI.SidebarMenuButton
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
SidebarMenuButton.displayName = "SidebarMenuButton"

const SidebarMenuItem = React.forwardRef<
  React.ComponentRef<typeof UI.SidebarMenuItem>,
  React.ComponentPropsWithoutRef<typeof UI.SidebarMenuItem>
>(({ className, ...props }, ref) => {
  return (
    <UI.SidebarMenuItem
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
SidebarMenuItem.displayName = "SidebarMenuItem"

const SidebarMenuSkeleton = React.forwardRef<
  React.ComponentRef<typeof UI.SidebarMenuSkeleton>,
  React.ComponentPropsWithoutRef<typeof UI.SidebarMenuSkeleton>
>(({ className, ...props }, ref) => {
  return (
    <UI.SidebarMenuSkeleton
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
SidebarMenuSkeleton.displayName = "SidebarMenuSkeleton"

const SidebarMenuSub = React.forwardRef<
  React.ComponentRef<typeof UI.SidebarMenuSub>,
  React.ComponentPropsWithoutRef<typeof UI.SidebarMenuSub>
>(({ className, ...props }, ref) => {
  return (
    <UI.SidebarMenuSub
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
SidebarMenuSub.displayName = "SidebarMenuSub"

const SidebarMenuSubButton = React.forwardRef<
  React.ComponentRef<typeof UI.SidebarMenuSubButton>,
  React.ComponentPropsWithoutRef<typeof UI.SidebarMenuSubButton>
>(({ className, ...props }, ref) => {
  return (
    <UI.SidebarMenuSubButton
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
SidebarMenuSubButton.displayName = "SidebarMenuSubButton"

const SidebarMenuSubItem = React.forwardRef<
  React.ComponentRef<typeof UI.SidebarMenuSubItem>,
  React.ComponentPropsWithoutRef<typeof UI.SidebarMenuSubItem>
>(({ className, ...props }, ref) => {
  return (
    <UI.SidebarMenuSubItem
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
SidebarMenuSubItem.displayName = "SidebarMenuSubItem"

const SidebarProvider = React.forwardRef<
  React.ComponentRef<typeof UI.SidebarProvider>,
  React.ComponentPropsWithoutRef<typeof UI.SidebarProvider>
>(({ className, ...props }, ref) => {
  return (
    <UI.SidebarProvider
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
SidebarProvider.displayName = "SidebarProvider"

const SidebarRail = React.forwardRef<
  React.ComponentRef<typeof UI.SidebarRail>,
  React.ComponentPropsWithoutRef<typeof UI.SidebarRail>
>(({ className, ...props }, ref) => {
  return (
    <UI.SidebarRail
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
SidebarRail.displayName = "SidebarRail"

const SidebarSeparator = React.forwardRef<
  React.ComponentRef<typeof UI.SidebarSeparator>,
  React.ComponentPropsWithoutRef<typeof UI.SidebarSeparator>
>(({ className, ...props }, ref) => {
  return (
    <UI.SidebarSeparator
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
SidebarSeparator.displayName = "SidebarSeparator"

const SidebarTrigger = React.forwardRef<
  React.ComponentRef<typeof UI.SidebarTrigger>,
  React.ComponentPropsWithoutRef<typeof UI.SidebarTrigger>
>(({ className, ...props }, ref) => {
  return (
    <UI.SidebarTrigger
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
SidebarTrigger.displayName = "SidebarTrigger"

const useSidebar = UI.useSidebar

export { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupAction, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarInput, SidebarInset, SidebarMenu, SidebarMenuAction, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem, SidebarMenuSkeleton, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, SidebarProvider, SidebarRail, SidebarSeparator, SidebarTrigger, useSidebar }

import * as React from "react"
import * as UI from "@/components/ui/breadcrumb"
import { cn } from "@/lib/utils"

const Breadcrumb = React.forwardRef<
  React.ComponentRef<typeof UI.Breadcrumb>,
  React.ComponentPropsWithoutRef<typeof UI.Breadcrumb>
>((props, ref) => {
  return (
    <UI.Breadcrumb
      ref={ref}
      {...props}
    />
  )
})
Breadcrumb.displayName = "Breadcrumb"

const BreadcrumbList = React.forwardRef<
  React.ComponentRef<typeof UI.BreadcrumbList>,
  React.ComponentPropsWithoutRef<typeof UI.BreadcrumbList>
>(({ className, ...props }, ref) => {
  return (
    <UI.BreadcrumbList
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
BreadcrumbList.displayName = "BreadcrumbList"

const BreadcrumbItem = React.forwardRef<
  React.ComponentRef<typeof UI.BreadcrumbItem>,
  React.ComponentPropsWithoutRef<typeof UI.BreadcrumbItem>
>(({ className, ...props }, ref) => {
  return (
    <UI.BreadcrumbItem
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
BreadcrumbItem.displayName = "BreadcrumbItem"

const BreadcrumbLink = React.forwardRef<
  React.ComponentRef<typeof UI.BreadcrumbLink>,
  React.ComponentPropsWithoutRef<typeof UI.BreadcrumbLink>
>(({ className, ...props }, ref) => {
  return (
    <UI.BreadcrumbLink
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
BreadcrumbLink.displayName = "BreadcrumbLink"

const BreadcrumbPage = React.forwardRef<
  React.ComponentRef<typeof UI.BreadcrumbPage>,
  React.ComponentPropsWithoutRef<typeof UI.BreadcrumbPage>
>(({ className, ...props }, ref) => {
  return (
    <UI.BreadcrumbPage
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
BreadcrumbPage.displayName = "BreadcrumbPage"

const BreadcrumbSeparator = React.forwardRef<
  React.ComponentRef<typeof UI.BreadcrumbSeparator>,
  React.ComponentPropsWithoutRef<typeof UI.BreadcrumbSeparator>
>(({ className, ...props }, ref) => {
  return (
    <UI.BreadcrumbSeparator
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
BreadcrumbSeparator.displayName = "BreadcrumbSeparator"

const BreadcrumbEllipsis = React.forwardRef<
  React.ComponentRef<typeof UI.BreadcrumbEllipsis>,
  React.ComponentPropsWithoutRef<typeof UI.BreadcrumbEllipsis>
>(({ className, ...props }, ref) => {
  return (
    <UI.BreadcrumbEllipsis
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis"

export { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis }

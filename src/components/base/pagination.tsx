import * as React from "react"
import * as UI from "@/components/ui/pagination.tsx"
import { cn } from "@/lib/utils"

const Pagination = React.forwardRef<
  React.ComponentRef<typeof UI.Pagination>,
  React.ComponentPropsWithoutRef<typeof UI.Pagination>
>(({ className, ...props }, ref) => {
  return (
    <UI.Pagination
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
Pagination.displayName = "Pagination"

const PaginationContent = React.forwardRef<
  React.ComponentRef<typeof UI.PaginationContent>,
  React.ComponentPropsWithoutRef<typeof UI.PaginationContent>
>(({ className, ...props }, ref) => {
  return (
    <UI.PaginationContent
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
PaginationContent.displayName = "PaginationContent"

const PaginationItem = React.forwardRef<
  React.ComponentRef<typeof UI.PaginationItem>,
  React.ComponentPropsWithoutRef<typeof UI.PaginationItem>
>(({ className, ...props }, ref) => {
  return (
    <UI.PaginationItem
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
PaginationItem.displayName = "PaginationItem"

const PaginationLink = React.forwardRef<
  React.ComponentRef<typeof UI.PaginationLink>,
  React.ComponentPropsWithoutRef<typeof UI.PaginationLink>
>(({ className, ...props }, ref) => {
  return (
    <UI.PaginationLink
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
PaginationLink.displayName = "PaginationLink"

const PaginationPrevious = React.forwardRef<
  React.ComponentRef<typeof UI.PaginationPrevious>,
  React.ComponentPropsWithoutRef<typeof UI.PaginationPrevious>
>(({ className, ...props }, ref) => {
  return (
    <UI.PaginationPrevious
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
PaginationPrevious.displayName = "PaginationPrevious"

const PaginationNext = React.forwardRef<
  React.ComponentRef<typeof UI.PaginationNext>,
  React.ComponentPropsWithoutRef<typeof UI.PaginationNext>
>(({ className, ...props }, ref) => {
  return (
    <UI.PaginationNext
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
PaginationNext.displayName = "PaginationNext"

const PaginationEllipsis = React.forwardRef<
  React.ComponentRef<typeof UI.PaginationEllipsis>,
  React.ComponentPropsWithoutRef<typeof UI.PaginationEllipsis>
>(({ className, ...props }, ref) => {
  return (
    <UI.PaginationEllipsis
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
PaginationEllipsis.displayName = "PaginationEllipsis"

export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
}

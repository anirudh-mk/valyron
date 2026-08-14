import * as React from "react"
import * as UI from "@/components/ui/table"
import { cn } from "@/lib/utils"

const Table = React.forwardRef<
  React.ComponentRef<typeof UI.Table>,
  React.ComponentPropsWithoutRef<typeof UI.Table>
>(({ className, ...props }, ref) => {
  return (
    <UI.Table
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
Table.displayName = "Table"

const TableHeader = React.forwardRef<
  React.ComponentRef<typeof UI.TableHeader>,
  React.ComponentPropsWithoutRef<typeof UI.TableHeader>
>(({ className, ...props }, ref) => {
  return (
    <UI.TableHeader
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<
  React.ComponentRef<typeof UI.TableBody>,
  React.ComponentPropsWithoutRef<typeof UI.TableBody>
>(({ className, ...props }, ref) => {
  return (
    <UI.TableBody
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
TableBody.displayName = "TableBody"

const TableFooter = React.forwardRef<
  React.ComponentRef<typeof UI.TableFooter>,
  React.ComponentPropsWithoutRef<typeof UI.TableFooter>
>(({ className, ...props }, ref) => {
  return (
    <UI.TableFooter
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
TableFooter.displayName = "TableFooter"

const TableHead = React.forwardRef<
  React.ComponentRef<typeof UI.TableHead>,
  React.ComponentPropsWithoutRef<typeof UI.TableHead>
>(({ className, ...props }, ref) => {
  return (
    <UI.TableHead
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
TableHead.displayName = "TableHead"

const TableRow = React.forwardRef<
  React.ComponentRef<typeof UI.TableRow>,
  React.ComponentPropsWithoutRef<typeof UI.TableRow>
>(({ className, ...props }, ref) => {
  return (
    <UI.TableRow
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
TableRow.displayName = "TableRow"

const TableCell = React.forwardRef<
  React.ComponentRef<typeof UI.TableCell>,
  React.ComponentPropsWithoutRef<typeof UI.TableCell>
>(({ className, ...props }, ref) => {
  return (
    <UI.TableCell
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
TableCell.displayName = "TableCell"

const TableCaption = React.forwardRef<
  React.ComponentRef<typeof UI.TableCaption>,
  React.ComponentPropsWithoutRef<typeof UI.TableCaption>
>(({ className, ...props }, ref) => {
  return (
    <UI.TableCaption
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
TableCaption.displayName = "TableCaption"

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption }

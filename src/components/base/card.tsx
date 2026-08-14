import * as React from "react"
import * as UI from "@/components/ui/card"
import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  React.ComponentRef<typeof UI.Card>,
  React.ComponentPropsWithoutRef<typeof UI.Card>
>(({ className, ...props }, ref) => {
  return (
    <UI.Card
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  React.ComponentRef<typeof UI.CardHeader>,
  React.ComponentPropsWithoutRef<typeof UI.CardHeader>
>(({ className, ...props }, ref) => {
  return (
    <UI.CardHeader
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
CardHeader.displayName = "CardHeader"

const CardFooter = React.forwardRef<
  React.ComponentRef<typeof UI.CardFooter>,
  React.ComponentPropsWithoutRef<typeof UI.CardFooter>
>(({ className, ...props }, ref) => {
  return (
    <UI.CardFooter
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
CardFooter.displayName = "CardFooter"

const CardTitle = React.forwardRef<
  React.ComponentRef<typeof UI.CardTitle>,
  React.ComponentPropsWithoutRef<typeof UI.CardTitle>
>(({ className, ...props }, ref) => {
  return (
    <UI.CardTitle
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
CardTitle.displayName = "CardTitle"

const CardAction = React.forwardRef<
  React.ComponentRef<typeof UI.CardAction>,
  React.ComponentPropsWithoutRef<typeof UI.CardAction>
>(({ className, ...props }, ref) => {
  return (
    <UI.CardAction
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
CardAction.displayName = "CardAction"

const CardDescription = React.forwardRef<
  React.ComponentRef<typeof UI.CardDescription>,
  React.ComponentPropsWithoutRef<typeof UI.CardDescription>
>(({ className, ...props }, ref) => {
  return (
    <UI.CardDescription
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  React.ComponentRef<typeof UI.CardContent>,
  React.ComponentPropsWithoutRef<typeof UI.CardContent>
>(({ className, ...props }, ref) => {
  return (
    <UI.CardContent
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
CardContent.displayName = "CardContent"

export { Card, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent }

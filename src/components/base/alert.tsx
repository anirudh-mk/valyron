import * as React from "react"
import * as UI from "@/components/ui/alert"
import { cn } from "@/lib/utils"

const Alert = React.forwardRef<
  React.ComponentRef<typeof UI.Alert>,
  React.ComponentPropsWithoutRef<typeof UI.Alert>
>(({ className, ...props }, ref) => {
  return (
    <UI.Alert
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  React.ComponentRef<typeof UI.AlertTitle>,
  React.ComponentPropsWithoutRef<typeof UI.AlertTitle>
>(({ className, ...props }, ref) => {
  return (
    <UI.AlertTitle
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  React.ComponentRef<typeof UI.AlertDescription>,
  React.ComponentPropsWithoutRef<typeof UI.AlertDescription>
>(({ className, ...props }, ref) => {
  return (
    <UI.AlertDescription
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
AlertDescription.displayName = "AlertDescription"

const AlertAction = React.forwardRef<
  React.ComponentRef<typeof UI.AlertAction>,
  React.ComponentPropsWithoutRef<typeof UI.AlertAction>
>(({ className, ...props }, ref) => {
  return (
    <UI.AlertAction
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
AlertAction.displayName = "AlertAction"

export { Alert, AlertTitle, AlertDescription, AlertAction }

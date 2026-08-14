import * as React from "react"
import * as UI from "@/components/ui/button"
import { cn } from "@/lib/utils"

const Button = React.forwardRef<
  React.ComponentRef<typeof UI.Button>,
  React.ComponentPropsWithoutRef<typeof UI.Button>
>(({ className, ...props }, ref) => {
  return (
    <UI.Button
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
Button.displayName = "Button"

const buttonVariants = UI.buttonVariants

export { Button, buttonVariants }

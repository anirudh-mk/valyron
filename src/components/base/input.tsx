import * as React from "react"
import * as UI from "@/components/ui/input"
import { cn } from "@/lib/utils"

const Input = React.forwardRef<
  React.ComponentRef<typeof UI.Input>,
  React.ComponentPropsWithoutRef<typeof UI.Input>
>(({ className, ...props }, ref) => {
  return (
    <UI.Input
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
Input.displayName = "Input"

export { Input }

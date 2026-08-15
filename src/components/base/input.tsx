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
      className={cn(
        "rounded-md",
        "focus-visible:border-transparent",
        "focus-visible:ring-0",
        "focus-visible:ring-offset-0",
        className
      )}
      {...props}
    />
  )
})
Input.displayName = "Input"

export { Input }

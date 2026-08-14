import * as React from "react"
import * as UI from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

const Textarea = React.forwardRef<
  React.ComponentRef<typeof UI.Textarea>,
  React.ComponentPropsWithoutRef<typeof UI.Textarea>
>(({ className, ...props }, ref) => {
  return (
    <UI.Textarea
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }

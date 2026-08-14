import * as React from "react"
import * as UI from "@/components/ui/collapsible"
import { cn } from "@/lib/utils"

const Collapsible = React.forwardRef<
  React.ComponentRef<typeof UI.Collapsible>,
  React.ComponentPropsWithoutRef<typeof UI.Collapsible>
>((props, ref) => {
  return (
    <UI.Collapsible
      ref={ref}
      {...props}
    />
  )
})
Collapsible.displayName = "Collapsible"

const CollapsibleTrigger = React.forwardRef<
  React.ComponentRef<typeof UI.CollapsibleTrigger>,
  React.ComponentPropsWithoutRef<typeof UI.CollapsibleTrigger>
>((props, ref) => {
  return (
    <UI.CollapsibleTrigger
      ref={ref}
      {...props}
    />
  )
})
CollapsibleTrigger.displayName = "CollapsibleTrigger"

const CollapsibleContent = React.forwardRef<
  React.ComponentRef<typeof UI.CollapsibleContent>,
  React.ComponentPropsWithoutRef<typeof UI.CollapsibleContent>
>((props, ref) => {
  return (
    <UI.CollapsibleContent
      ref={ref}
      {...props}
    />
  )
})
CollapsibleContent.displayName = "CollapsibleContent"

export { Collapsible, CollapsibleTrigger, CollapsibleContent }

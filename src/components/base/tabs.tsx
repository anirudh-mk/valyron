import * as React from "react"
import * as UI from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

const Tabs = React.forwardRef<
  React.ComponentRef<typeof UI.Tabs>,
  React.ComponentPropsWithoutRef<typeof UI.Tabs>
>(({ className, ...props }, ref) => {
  return (
    <UI.Tabs
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
Tabs.displayName = "Tabs"

const TabsList = React.forwardRef<
  React.ComponentRef<typeof UI.TabsList>,
  React.ComponentPropsWithoutRef<typeof UI.TabsList>
>(({ className, ...props }, ref) => {
  return (
    <UI.TabsList
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
TabsList.displayName = "TabsList"

const TabsTrigger = React.forwardRef<
  React.ComponentRef<typeof UI.TabsTrigger>,
  React.ComponentPropsWithoutRef<typeof UI.TabsTrigger>
>(({ className, ...props }, ref) => {
  return (
    <UI.TabsTrigger
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
TabsTrigger.displayName = "TabsTrigger"

const TabsContent = React.forwardRef<
  React.ComponentRef<typeof UI.TabsContent>,
  React.ComponentPropsWithoutRef<typeof UI.TabsContent>
>(({ className, ...props }, ref) => {
  return (
    <UI.TabsContent
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
TabsContent.displayName = "TabsContent"

const tabsListVariants = UI.tabsListVariants

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants }

import * as React from "react"
import * as UI from "@/components/ui/field"
import { cn } from "@/lib/utils"

const Field = React.forwardRef<
  React.ComponentRef<typeof UI.Field>,
  React.ComponentPropsWithoutRef<typeof UI.Field>
>(({ className, ...props }, ref) => {
  return (
    <UI.Field
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
Field.displayName = "Field"

const FieldLabel = React.forwardRef<
  React.ComponentRef<typeof UI.FieldLabel>,
  React.ComponentPropsWithoutRef<typeof UI.FieldLabel>
>(({ className, ...props }, ref) => {
  return (
    <UI.FieldLabel
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
FieldLabel.displayName = "FieldLabel"

const FieldDescription = React.forwardRef<
  React.ComponentRef<typeof UI.FieldDescription>,
  React.ComponentPropsWithoutRef<typeof UI.FieldDescription>
>(({ className, ...props }, ref) => {
  return (
    <UI.FieldDescription
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
FieldDescription.displayName = "FieldDescription"

const FieldError = React.forwardRef<
  React.ComponentRef<typeof UI.FieldError>,
  React.ComponentPropsWithoutRef<typeof UI.FieldError>
>(({ className, ...props }, ref) => {
  return (
    <UI.FieldError
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
FieldError.displayName = "FieldError"

const FieldGroup = React.forwardRef<
  React.ComponentRef<typeof UI.FieldGroup>,
  React.ComponentPropsWithoutRef<typeof UI.FieldGroup>
>(({ className, ...props }, ref) => {
  return (
    <UI.FieldGroup
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
FieldGroup.displayName = "FieldGroup"

const FieldLegend = React.forwardRef<
  React.ComponentRef<typeof UI.FieldLegend>,
  React.ComponentPropsWithoutRef<typeof UI.FieldLegend>
>(({ className, ...props }, ref) => {
  return (
    <UI.FieldLegend
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
FieldLegend.displayName = "FieldLegend"

const FieldSeparator = React.forwardRef<
  React.ComponentRef<typeof UI.FieldSeparator>,
  React.ComponentPropsWithoutRef<typeof UI.FieldSeparator>
>(({ className, ...props }, ref) => {
  return (
    <UI.FieldSeparator
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
FieldSeparator.displayName = "FieldSeparator"

const FieldSet = React.forwardRef<
  React.ComponentRef<typeof UI.FieldSet>,
  React.ComponentPropsWithoutRef<typeof UI.FieldSet>
>(({ className, ...props }, ref) => {
  return (
    <UI.FieldSet
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
FieldSet.displayName = "FieldSet"

const FieldContent = React.forwardRef<
  React.ComponentRef<typeof UI.FieldContent>,
  React.ComponentPropsWithoutRef<typeof UI.FieldContent>
>(({ className, ...props }, ref) => {
  return (
    <UI.FieldContent
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
FieldContent.displayName = "FieldContent"

const FieldTitle = React.forwardRef<
  React.ComponentRef<typeof UI.FieldTitle>,
  React.ComponentPropsWithoutRef<typeof UI.FieldTitle>
>(({ className, ...props }, ref) => {
  return (
    <UI.FieldTitle
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
})
FieldTitle.displayName = "FieldTitle"

export { Field, FieldLabel, FieldDescription, FieldError, FieldGroup, FieldLegend, FieldSeparator, FieldSet, FieldContent, FieldTitle }

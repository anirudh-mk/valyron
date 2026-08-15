import * as React from "react";
import {cn} from "@/lib/utils";

type TypographyVariant =
  | "heading"
  | "subheading"
  | "title"
  | "subtitle"
  | "body"
  | "paragraph"
  | "label"
  | "caption"
  | "helper"
  | "muted"
  | "overline";

interface TypographyProps
  extends React.HTMLAttributes<HTMLElement> {
  variant?: TypographyVariant;
  as?: React.ElementType;
  children: React.ReactNode;
}

const variantStyles: Record<TypographyVariant, string> = {
  heading:
    "text-2xl font-semibold tracking-tight text-foreground",

  subheading:
    "text-sm text-muted-foreground",

  title:
    "text-lg font-semibold text-foreground",

  subtitle:
    "text-sm text-muted-foreground",

  body:
    "text-sm text-foreground",

  paragraph:
    "text-sm leading-6 text-foreground",

  label:
    "text-sm font-medium text-foreground",

  caption:
    "text-xs text-muted-foreground",

  helper:
    "text-xs text-muted-foreground",

  muted:
    "text-sm text-muted-foreground",

  overline:
    "text-xs font-medium uppercase tracking-wider text-muted-foreground",
};

const defaultElements: Record<TypographyVariant, React.ElementType> = {
  heading: "h1",
  subheading: "p",
  title: "h2",
  subtitle: "p",
  body: "p",
  paragraph: "p",
  label: "label",
  caption: "span",
  helper: "p",
  muted: "span",
  overline: "span",
};

export function Typography({
                             variant = "body",
                             as,
                             className,
                             children,
                             ...props
                           }: TypographyProps) {
  const Component = as || defaultElements[variant];

  return (
    <Component
      className={cn(variantStyles[variant], className)}
      {...props}
    >
      {children}
    </Component>
  );
}
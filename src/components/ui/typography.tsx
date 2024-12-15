import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const typographyVariants = cva("", {
  variants: {
    variant: {
      h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-8xl",
      h2: "scroll-m-20 text-3xl font-semibold tracking-tight",
      h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
      h4: "scroll-m-20 text-xl font-semibold tracking-tight",
      p: "leading-7 [&:not(:first-child)]:mt-6",
      blockquote: "mt-6 border-l-2 pl-6 italic",
      list: "my-6 ml-6 list-disc [&>li]:mt-2",
      lead: "text-xl text-muted-foreground",
      large: "text-lg font-semibold",
      small: "text-sm font-medium leading-none",
      muted: "text-sm text-muted-foreground",
    },
  },
  defaultVariants: {
    variant: "p",
  },
})

interface TypographyProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof typographyVariants> {
  as?: React.ElementType
}

const Typography = React.forwardRef<HTMLParagraphElement, TypographyProps>(
  ({ className, variant, as: Component = "p", ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(typographyVariants({ variant, className }))}
        {...props}
      />
    )
  }
)

Typography.displayName = "Typography"

export { Typography, typographyVariants }

"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const dcyfrProgressRootVariants = cva(
  "relative w-full overflow-hidden rounded-full",
  {
    variants: {
      variant: {
        default: "bg-primary/20",
        secure: "bg-secure/20",
        danger: "bg-destructive/20",
        success: "bg-success/20",
      },
      size: {
        sm: "h-1",
        md: "h-2",
        lg: "h-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

const dcyfrProgressIndicatorVariants = cva(
  "h-full w-full flex-1 transition-transform duration-300 ease-out",
  {
    variants: {
      variant: {
        default: "bg-primary",
        secure: "bg-secure",
        danger: "bg-destructive",
        success: "bg-success",
      },
      indeterminate: {
        true: "animate-pulse",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      indeterminate: false,
    },
  }
)

export interface DcyfrProgressProps
  extends React.ComponentProps<typeof ProgressPrimitive.Root>,
    VariantProps<typeof dcyfrProgressRootVariants> {
  /** When true, shows a pulsing indeterminate state. `value` is ignored. */
  indeterminate?: boolean
}

function DcyfrProgress({
  className,
  value,
  variant,
  size,
  indeterminate = false,
  ...props
}: DcyfrProgressProps) {
  const translate = indeterminate ? 0 : 100 - (value || 0)
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(dcyfrProgressRootVariants({ variant, size, className }))}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={cn(
          dcyfrProgressIndicatorVariants({ variant, indeterminate })
        )}
        style={{ transform: `translateX(-${translate}%)` }}
      />
    </ProgressPrimitive.Root>
  )
}

export { DcyfrProgress, dcyfrProgressRootVariants }

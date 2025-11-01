import { forwardRef } from "react"
import { cn } from "@/utils/cn"

const Card = forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "glass rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl hover:-translate-y-1",
      className
    )}
    {...props}
  />
))

Card.displayName = "Card"

const CardHeader = forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))

CardHeader.displayName = "CardHeader"

const CardTitle = forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-lg font-semibold text-white", className)}
    {...props}
  />
))

CardTitle.displayName = "CardTitle"

const CardContent = forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))

CardContent.displayName = "CardContent"

export { Card, CardHeader, CardTitle, CardContent }
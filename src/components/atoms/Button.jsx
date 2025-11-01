import { forwardRef } from "react"
import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"

const Button = forwardRef(({ 
  className, 
  variant = "default", 
  size = "default", 
  children,
  loading = false,
  icon,
  ...props 
}, ref) => {
  const variants = {
    default: "bg-primary text-white hover:bg-primary/90 active:scale-95",
    outline: "border border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white",
    ghost: "text-gray-300 hover:bg-surface hover:text-white",
    gradient: "bg-gradient-to-r from-primary to-accent text-white hover:from-primary/90 hover:to-accent/90",
    play: "bg-primary text-white hover:bg-primary/90 hover:scale-105 active:scale-95 shadow-lg hover:shadow-primary/25"
  }

  const sizes = {
    sm: "h-8 px-3 text-sm",
    default: "h-10 px-4 py-2",
    lg: "h-12 px-6 text-lg",
    icon: "h-10 w-10"
  }

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className
      )}
      ref={ref}
      disabled={loading}
      {...props}
    >
      {loading && (
        <ApperIcon name="Loader2" className="mr-2 h-4 w-4 animate-spin" />
      )}
      {icon && !loading && (
        <ApperIcon name={icon} className="mr-2 h-4 w-4" />
      )}
      {children}
    </button>
  )
})

Button.displayName = "Button"

export default Button
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"

const Empty = ({ 
  title = "Nothing here yet", 
  message = "It looks like there's no content to display right now.",
  action,
  actionLabel = "Get Started",
  icon = "Search",
  className = "" 
}) => {
  return (
    <div className={`flex flex-col items-center justify-center space-y-6 p-12 text-center ${className}`}>
      <div className="relative">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gray-700/20 to-gray-800/20 flex items-center justify-center border border-gray-700/30">
          <ApperIcon name={icon} className="w-12 h-12 text-gray-500" />
        </div>
        <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 flex items-center justify-center border-2 border-background">
          <ApperIcon name="Plus" className="w-4 h-4 text-primary" />
        </div>
      </div>
      
      <div className="space-y-3 max-w-sm">
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <p className="text-gray-400 leading-relaxed">{message}</p>
      </div>

      {action && (
        <Button 
          onClick={action}
          className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
        >
          <ApperIcon name="Sparkles" className="w-4 h-4 mr-2" />
          {actionLabel}
        </Button>
      )}

      <div className="flex items-center space-x-6 text-xs text-gray-500 pt-4">
        <div className="flex items-center space-x-1">
          <ApperIcon name="Music" className="w-3 h-3" />
          <span>Discover Music</span>
        </div>
        <div className="flex items-center space-x-1">
          <ApperIcon name="Heart" className="w-3 h-3" />
          <span>Find Your Vibe</span>
        </div>
        <div className="flex items-center space-x-1">
          <ApperIcon name="PlayCircle" className="w-3 h-3" />
          <span>Start Listening</span>
        </div>
      </div>
    </div>
  )
}

export default Empty
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"

const Error = ({ message = "Something went wrong", onRetry, className = "" }) => {
  return (
    <div className={`flex flex-col items-center justify-center space-y-6 p-8 text-center ${className}`}>
      <div className="relative">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-500/20 to-red-600/20 flex items-center justify-center border border-red-500/30">
          <ApperIcon name="AlertCircle" className="w-10 h-10 text-red-500" />
        </div>
      </div>
      
      <div className="space-y-2 max-w-md">
        <h3 className="text-xl font-bold text-white">Oops! Something went wrong</h3>
        <p className="text-gray-400 leading-relaxed">{message}</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        {onRetry && (
          <Button 
            onClick={onRetry}
            className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
          >
            <ApperIcon name="RefreshCw" className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        )}
        <Button 
          variant="outline"
          onClick={() => window.location.reload()}
          className="border-gray-600 text-gray-300 hover:bg-gray-800"
        >
          <ApperIcon name="RotateCcw" className="w-4 h-4 mr-2" />
          Refresh Page
        </Button>
      </div>

      <div className="text-xs text-gray-500 mt-4">
        If this problem persists, please check your connection or try again later.
      </div>
    </div>
  )
}

export default Error
import ApperIcon from "@/components/ApperIcon"

const Loading = ({ className = "" }) => {
  return (
    <div className={`flex flex-col items-center justify-center space-y-6 p-8 ${className}`}>
      <div className="relative">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-surface border-t-primary"></div>
        <ApperIcon 
          name="Music" 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-primary w-6 h-6" 
        />
      </div>
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold text-white">Loading your music...</h3>
        <p className="text-gray-400">Getting everything ready for you</p>
      </div>
      
      {/* Skeleton content */}
      <div className="w-full max-w-md space-y-3">
        <div className="flex items-center space-x-3">
          <div className="shimmer w-12 h-12 rounded-lg"></div>
          <div className="flex-1 space-y-2">
            <div className="shimmer h-4 w-3/4 rounded"></div>
            <div className="shimmer h-3 w-1/2 rounded"></div>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="shimmer w-12 h-12 rounded-lg"></div>
          <div className="flex-1 space-y-2">
            <div className="shimmer h-4 w-2/3 rounded"></div>
            <div className="shimmer h-3 w-1/3 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Loading
import { motion, AnimatePresence } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"

const StatusBanner = ({ hasPlayedFreeSong, onGetStarted }) => {
  const message = hasPlayedFreeSong 
    ? "Sign up to continue listening" 
    : "You have 1 free song"
  
  const icon = hasPlayedFreeSong ? "AlertCircle" : "Music"
  const bgColor = hasPlayedFreeSong 
    ? "bg-gradient-to-r from-accent/20 to-accent/10 border-accent/30" 
    : "bg-gradient-to-r from-primary/20 to-primary/10 border-primary/30"

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        className={`fixed top-0 left-0 right-0 z-50 ${bgColor} backdrop-blur-md border-b`}
      >
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <ApperIcon 
                name={icon} 
                className={`w-5 h-5 ${hasPlayedFreeSong ? 'text-accent' : 'text-primary'}`} 
              />
              <span className="text-white font-medium">{message}</span>
            </div>
            
            {hasPlayedFreeSong && (
              <Button
                onClick={onGetStarted}
                variant="gradient"
                size="sm"
                className="ml-4"
              >
                Sign Up Free
              </Button>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default StatusBanner
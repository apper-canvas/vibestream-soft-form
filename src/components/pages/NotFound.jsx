import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center space-y-8 max-w-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative mx-auto w-32 h-32 mb-8">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 animate-pulse"></div>
            <div className="absolute inset-4 rounded-full bg-surface flex items-center justify-center">
              <ApperIcon name="MusicOff" className="w-12 h-12 text-gray-500" />
            </div>
          </div>
          
          <h1 className="font-display font-bold text-6xl md:text-8xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
            404
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Beat Not Found
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            Looks like this track got lost in the mix. Let's get you back to the music!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="space-y-4"
        >
          <Button
            onClick={() => navigate("/")}
            variant="gradient"
            size="lg"
            className="w-full text-lg py-3"
          >
            <ApperIcon name="Home" className="w-5 h-5 mr-2" />
            Back to Home
          </Button>
          
          <Button
            onClick={() => window.history.back()}
            variant="outline"
            size="lg"
            className="w-full border-gray-600 hover:border-primary"
          >
            <ApperIcon name="ArrowLeft" className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex items-center justify-center space-x-6 text-sm text-gray-500 pt-8"
        >
          <div className="flex items-center space-x-1">
            <ApperIcon name="Music" className="w-4 h-4" />
            <span>Discover Music</span>
          </div>
          <div className="flex items-center space-x-1">
            <ApperIcon name="Search" className="w-4 h-4" />
            <span>Find Artists</span>
          </div>
          <div className="flex items-center space-x-1">
            <ApperIcon name="ListMusic" className="w-4 h-4" />
            <span>Browse Playlists</span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default NotFound
import { motion, AnimatePresence } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/Card"

const PlaybackLimitModal = ({ isOpen, onClose, onSignUp, onLogin }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative z-10 w-full max-w-md"
          >
            <Card className="bg-surface/95 backdrop-blur-md border-gray-700 shadow-2xl">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center mb-4 animate-pulse-glow">
                  <ApperIcon name="Music" className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Loving the music?
                </CardTitle>
              </CardHeader>

              <CardContent className="text-center space-y-6">
                <p className="text-gray-300 text-lg leading-relaxed">
                  Sign up to keep the vibe going and unlock unlimited streaming!
                </p>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex items-center space-x-3 text-sm text-gray-400">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      <span>Unlimited song streaming</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm text-gray-400">
                      <div className="w-2 h-2 rounded-full bg-accent"></div>
                      <span>Create personal playlists</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm text-gray-400">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      <span>Discover new music daily</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button
                    onClick={onSignUp}
                    variant="gradient"
                    className="w-full text-lg py-3 animate-pulse-glow"
                  >
                    <ApperIcon name="UserPlus" className="w-5 h-5 mr-2" />
                    Sign Up Free
                  </Button>
                  
                  <Button
                    onClick={onLogin}
                    variant="outline"
                    className="w-full border-gray-600 hover:border-primary hover:text-primary"
                  >
                    <ApperIcon name="LogIn" className="w-4 h-4 mr-2" />
                    Already have an account? Log in
                  </Button>
                </div>

                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-300 text-sm transition-colors underline"
                >
                  Continue browsing
                </button>
              </CardContent>
            </Card>

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-surface border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
            >
              <ApperIcon name="X" className="w-4 h-4" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default PlaybackLimitModal
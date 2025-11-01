import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import { cn } from "@/utils/cn"

const FloatingNote = ({ delay = 0, duration = 20 }) => (
  <motion.div
    initial={{ y: "100vh", rotate: 0, opacity: 0 }}
    animate={{ 
      y: "-100vh", 
      rotate: 360,
      opacity: [0, 1, 1, 0]
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "linear"
    }}
    className="absolute text-white/10"
  >
    <ApperIcon name="Music" className="w-8 h-8" />
  </motion.div>
)

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/20">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 animate-pulse" />
      </div>

      {/* Floating Music Notes */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <FloatingNote 
            key={i} 
            delay={i * 2.5} 
            duration={15 + Math.random() * 10}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center space-y-8 px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Logo/Brand */}
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center animate-pulse-glow">
              <ApperIcon name="Music" className="w-8 h-8 text-white" />
            </div>
          </div>

          <h1 className="font-display font-black text-5xl md:text-7xl lg:text-8xl text-white mb-4">
            <span className="bg-gradient-to-r from-primary via-white to-accent bg-clip-text text-transparent">
              VibeStream
            </span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="text-2xl md:text-3xl font-medium text-gray-300 mb-2">
            Your Music, Your Vibe
          </p>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Discover millions of songs, create perfect playlists, and dive into the music that moves you. 
            Stream your favorite tracks and explore new sounds effortlessly.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
        >
          <Button
            variant="gradient"
            size="lg"
            className="text-lg px-8 py-4 shadow-2xl shadow-primary/25 animate-pulse-glow"
            onClick={() => document.getElementById('genres')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <ApperIcon name="Play" className="w-5 h-5 mr-2" />
            Start Listening
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            className="text-lg px-8 py-4 border-gray-600 hover:border-accent hover:text-accent"
            onClick={() => document.getElementById('charts')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <ApperIcon name="TrendingUp" className="w-5 h-5 mr-2" />
            Explore Charts
          </Button>
        </motion.div>

        {/* Feature Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center space-x-8 space-y-2 text-gray-400 text-sm pt-8"
        >
          <div className="flex items-center space-x-2">
            <ApperIcon name="Zap" className="w-4 h-4 text-primary" />
            <span>Instant Streaming</span>
          </div>
          <div className="flex items-center space-x-2">
            <ApperIcon name="Globe" className="w-4 h-4 text-accent" />
            <span>Millions of Songs</span>
          </div>
          <div className="flex items-center space-x-2">
            <ApperIcon name="Heart" className="w-4 h-4 text-primary" />
            <span>Personalized Experience</span>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center space-y-2 text-gray-500"
          >
            <span className="text-xs uppercase tracking-wide">Scroll to explore</span>
            <ApperIcon name="ChevronDown" className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
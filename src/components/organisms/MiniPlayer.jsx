import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import AudioVisualizer from "@/components/molecules/AudioVisualizer"
import { formatDuration } from "@/utils/formatDuration"

const MiniPlayer = ({ 
  currentSong, 
  isPlaying, 
  currentTime, 
  volume,
  onTogglePlayback, 
  onSeek, 
  onVolumeChange,
  getDuration,
  getFrequencyData
}) => {
  const [showVolumeSlider, setShowVolumeSlider] = useState(false)

  if (!currentSong) return null

  const duration = getDuration()
  const progress = duration ? (currentTime / duration) * 100 : 0

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const percent = (e.clientX - rect.left) / rect.width
    const newTime = percent * duration
    onSeek(newTime)
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-0 left-0 right-0 z-40 bg-surface/90 backdrop-blur-md border-t border-gray-700"
      >
        {/* Progress Bar */}
        <div 
          className="w-full h-1 bg-gray-700 cursor-pointer group"
          onClick={handleSeek}
        >
          <div 
            className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-200 group-hover:h-2"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Player Controls */}
        <div className="px-4 py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Song Info */}
<div className="flex items-center space-x-4 min-w-0 flex-1">
              <img
                src={currentSong.albumArt}
                alt={currentSong.album}
                className="w-14 h-14 rounded-lg object-cover shadow-lg"
              />
              
              <AudioVisualizer 
                getFrequencyData={getFrequencyData} 
                isPlaying={isPlaying}
              />
              
              <div className="min-w-0 flex-1">
                <h4 className="text-white font-medium truncate hover:text-primary transition-colors cursor-pointer">
                  {currentSong.title}
                </h4>
                <p className="text-gray-400 text-sm truncate">{currentSong.artist}</p>
              </div>
            </div>

            {/* Playback Controls */}
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2 text-xs text-gray-400">
                <span>{formatDuration(currentTime)}</span>
                <span>/</span>
                <span>{formatDuration(duration)}</span>
              </div>

              <Button
                onClick={onTogglePlayback}
                variant="play"
                size="icon"
                className="w-12 h-12"
              >
                <ApperIcon 
                  name={isPlaying ? "Pause" : "Play"} 
                  className="w-5 h-5" 
                />
              </Button>

              {/* Volume Control */}
              <div className="relative hidden md:flex items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowVolumeSlider(!showVolumeSlider)}
                  className="w-10 h-10"
                >
                  <ApperIcon 
                    name={volume === 0 ? "VolumeX" : volume < 0.5 ? "Volume1" : "Volume2"} 
                    className="w-4 h-4" 
                  />
                </Button>
                
                <AnimatePresence>
                  {showVolumeSlider && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="absolute bottom-full right-0 mb-2 p-3 glass rounded-lg shadow-xl"
                    >
                      <div className="flex flex-col items-center space-y-2">
                        <span className="text-xs text-gray-400">{Math.round(volume * 100)}%</span>
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.05"
                          value={volume}
                          onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
                          className="w-20 transform -rotate-90 origin-center"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Additional Controls */}
            <div className="hidden lg:flex items-center space-x-2 min-w-0 flex-1 justify-end">
              <Button variant="ghost" size="icon" className="w-8 h-8">
                <ApperIcon name="Heart" className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="w-8 h-8">
                <ApperIcon name="MoreHorizontal" className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default MiniPlayer
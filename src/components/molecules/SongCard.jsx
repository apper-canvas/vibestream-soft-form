import { useCallback } from "react"
import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import { formatDuration, formatPlayCount } from "@/utils/formatDuration"

const SongCard = ({ song, onPlay, isPlaying = false, isPreviewing = false, onPreview, onStopPreview, showPlayCount = false }) => {
  const handleMouseEnter = useCallback(() => {
    if (onPreview && !isPlaying) {
      onPreview(song)
    }
  }, [song, onPreview, isPlaying])

  const handleMouseLeave = useCallback(() => {
    if (onStopPreview && isPreviewing) {
      onStopPreview()
    }
  }, [onStopPreview, isPreviewing])
  return (
<motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -4 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="glass rounded-xl p-4 hover:shadow-xl hover:shadow-primary/10 transition-all duration-200 group"
    >
      <div className="flex items-center space-x-4">
        <div className="relative">
          <img
            src={song.albumArt}
            alt={song.album}
            className="w-16 h-16 rounded-lg object-cover"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
            <Button
              size="icon"
              variant="play"
onClick={() => onPlay(song)}
              className="w-8 h-8"
            >
              <ApperIcon 
                name={isPreviewing ? "Headphones" : (isPlaying ? "Pause" : "Play")} 
                className={`w-4 h-4 ${isPreviewing ? 'animate-pulse' : ''}`}
              />
            </Button>
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="text-white font-medium truncate group-hover:text-primary transition-colors">
            {song.title}
          </h4>
          <p className="text-gray-400 text-sm truncate">{song.artist}</p>
          {showPlayCount && (
            <p className="text-gray-500 text-xs">
              {formatPlayCount(song.playCount)} plays
            </p>
          )}
        </div>

        <div className="text-right space-y-1">
          <div className="text-gray-400 text-sm">
            {formatDuration(song.duration)}
          </div>
          <Button
            size="icon"
            variant="ghost"
            className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ApperIcon name="MoreHorizontal" className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

export default SongCard
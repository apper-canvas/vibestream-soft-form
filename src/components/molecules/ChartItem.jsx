import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import { formatPlayCount } from "@/utils/formatDuration"

const ChartItem = ({ chartEntry, onPlay, isPlaying = false }) => {
  const { rank, song } = chartEntry

  const getRankStyle = (rank) => {
    if (rank <= 3) return "text-primary font-bold text-xl"
    if (rank <= 10) return "text-accent font-semibold text-lg"
    return "text-gray-400 font-medium"
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: rank * 0.05 }}
      className="glass rounded-xl p-4 hover:shadow-xl hover:shadow-primary/10 transition-all duration-200 group"
    >
      <div className="flex items-center space-x-4">
        <div className={`w-8 text-center ${getRankStyle(rank)}`}>
          #{rank}
        </div>

        <div className="relative">
          <img
            src={song.albumArt}
            alt={song.album}
            className="w-14 h-14 rounded-lg object-cover"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
            <Button
              size="icon"
              variant="play"
              onClick={() => onPlay(song)}
              className="w-7 h-7"
            >
              <ApperIcon 
                name={isPlaying ? "Pause" : "Play"} 
                className="w-3 h-3" 
              />
            </Button>
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="text-white font-medium truncate group-hover:text-primary transition-colors">
            {song.title}
          </h4>
          <p className="text-gray-400 text-sm truncate">{song.artist}</p>
        </div>

        <div className="text-right">
          <div className="flex items-center space-x-2 text-gray-400 text-sm">
            <ApperIcon name="Play" className="w-3 h-3" />
            <span>{formatPlayCount(song.playCount)}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ChartItem
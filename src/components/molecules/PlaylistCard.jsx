import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import { Card, CardContent } from "@/components/atoms/Card"

const PlaylistCard = ({ playlist, onViewPlaylist }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05, y: -8 }}
      className="group cursor-pointer"
      onClick={() => onViewPlaylist(playlist)}
    >
      <Card className="overflow-hidden hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300">
        <div className="relative">
          <img
            src={playlist.coverImage}
            alt={playlist.name}
            className="w-full aspect-square object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="absolute bottom-4 right-4">
              <Button
                size="icon"
                variant="play"
                className="w-12 h-12 animate-pulse-glow"
              >
                <ApperIcon name="Play" className="w-6 h-6" />
              </Button>
            </div>
          </div>
          <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
            <span className="text-white text-xs font-medium">
              {playlist.songCount} songs
            </span>
          </div>
        </div>

        <CardContent className="p-4">
          <h3 className="text-white font-semibold text-lg truncate group-hover:text-primary transition-colors">
            {playlist.name}
          </h3>
          <p className="text-gray-400 text-sm mt-1 line-clamp-2">
            {playlist.description}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default PlaylistCard
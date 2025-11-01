import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import { Card, CardContent } from "@/components/atoms/Card"
import { formatPlayCount } from "@/utils/formatDuration"

const ArtistCard = ({ artist, onViewArtist }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05, y: -8 }}
      className="group cursor-pointer"
      onClick={() => onViewArtist(artist)}
    >
      <Card className="text-center hover:shadow-2xl hover:shadow-accent/20 transition-all duration-300">
        <CardContent className="p-6">
          <div className="relative mx-auto w-24 h-24 mb-4">
            <img
              src={artist.profileImage}
              alt={artist.name}
              className="w-full h-full rounded-full object-cover border-4 border-gray-700 group-hover:border-accent transition-colors"
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          <h3 className="text-white font-bold text-lg mb-2 group-hover:text-accent transition-colors">
            {artist.name}
          </h3>

          <div className="flex items-center justify-center space-x-2 text-gray-400 text-sm mb-4">
            <ApperIcon name="Users" className="w-4 h-4" />
            <span>{formatPlayCount(artist.followerCount)} followers</span>
          </div>

          <Button
            variant="outline"
            className="w-full group-hover:bg-accent group-hover:border-accent group-hover:text-white transition-all"
          >
            <ApperIcon name="User" className="w-4 h-4 mr-2" />
            View Artist
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default ArtistCard
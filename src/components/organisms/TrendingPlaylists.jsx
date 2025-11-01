import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"
import PlaylistCard from "@/components/molecules/PlaylistCard"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import Empty from "@/components/ui/Empty"
import playlistService from "@/services/api/playlistService"

const TrendingPlaylists = ({ onViewPlaylist }) => {
  const [playlists, setPlaylists] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const loadPlaylists = async () => {
    try {
      setLoading(true)
      setError("")
      const data = await playlistService.getTrending(8)
      setPlaylists(data)
    } catch (err) {
      setError("Failed to load trending playlists. Please try again.")
      console.error("Error loading playlists:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPlaylists()
  }, [])

  if (loading) {
    return (
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <Loading className="min-h-[400px]" />
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <Error message={error} onRetry={loadPlaylists} className="min-h-[400px]" />
        </div>
      </section>
    )
  }

  if (playlists.length === 0) {
    return (
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <Empty 
            title="No trending playlists"
            message="We're working on curating the best playlists for you."
            icon="ListMusic"
            className="min-h-[400px]"
          />
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background via-surface/10 to-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
            Trending
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent ml-3">
              Playlists
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Curated collections that everyone's talking about
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {playlists.map((playlist, index) => (
            <motion.div
              key={playlist.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <PlaylistCard 
                playlist={playlist} 
                onViewPlaylist={onViewPlaylist}
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <div className="flex items-center justify-center space-x-2 text-gray-500 text-sm">
            <ApperIcon name="TrendingUp" className="w-4 h-4" />
            <span>Updated daily with the hottest tracks</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default TrendingPlaylists
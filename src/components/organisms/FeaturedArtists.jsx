import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"
import ArtistCard from "@/components/molecules/ArtistCard"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import Empty from "@/components/ui/Empty"
import artistService from "@/services/api/artistService"

const FeaturedArtists = ({ onViewArtist }) => {
  const [artists, setArtists] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const loadArtists = async () => {
    try {
      setLoading(true)
      setError("")
      const data = await artistService.getFeatured(6)
      setArtists(data)
    } catch (err) {
      setError("Failed to load featured artists. Please try again.")
      console.error("Error loading artists:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadArtists()
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
          <Error message={error} onRetry={loadArtists} className="min-h-[400px]" />
        </div>
      </section>
    )
  }

  if (artists.length === 0) {
    return (
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <Empty 
            title="No featured artists"
            message="We're working on showcasing amazing artists for you."
            icon="Users"
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
            Featured
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent ml-3">
              Artists
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Discover the voices shaping today's music scene
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {artists.map((artist, index) => (
            <motion.div
              key={artist.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ArtistCard 
                artist={artist} 
                onViewArtist={onViewArtist}
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
            <ApperIcon name="Star" className="w-4 h-4" />
            <span>Handpicked artists from around the globe</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default FeaturedArtists
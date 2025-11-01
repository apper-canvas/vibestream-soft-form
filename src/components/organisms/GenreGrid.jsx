import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"
import GenreCard from "@/components/molecules/GenreCard"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import genreService from "@/services/api/genreService"

const GenreGrid = ({ onSelectGenre }) => {
  const [genres, setGenres] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const loadGenres = async () => {
    try {
      setLoading(true)
      setError("")
      const data = await genreService.getAll()
      setGenres(data)
    } catch (err) {
      setError("Failed to load genres. Please try again.")
      console.error("Error loading genres:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadGenres()
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
          <Error message={error} onRetry={loadGenres} className="min-h-[400px]" />
        </div>
      </section>
    )
  }

  return (
    <section id="genres" className="py-20 px-4 bg-gradient-to-b from-background via-surface/20 to-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
            Explore by 
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent ml-3">
              Genre
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Discover your perfect sound across all music genres
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {genres.map((genre, index) => (
            <motion.div
              key={genre.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <GenreCard 
                genre={genre} 
                onSelectGenre={onSelectGenre}
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
            <ApperIcon name="Sparkles" className="w-4 h-4" />
            <span>More genres coming soon</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default GenreGrid
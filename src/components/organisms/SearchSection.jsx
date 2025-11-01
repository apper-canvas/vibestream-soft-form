import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"
import SearchBar from "@/components/molecules/SearchBar"
import SongCard from "@/components/molecules/SongCard"
import Loading from "@/components/ui/Loading"
import Empty from "@/components/ui/Empty"
import songService from "@/services/api/songService"

const SearchSection = ({ onPlay, currentSong, isPlaying }) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = useCallback(async (query) => {
    setSearchQuery(query)
    
    if (!query.trim()) {
      setSearchResults([])
      setHasSearched(false)
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setHasSearched(true)
      const results = await songService.search(query)
      setSearchResults(results)
    } catch (error) {
      console.error("Search error:", error)
      setSearchResults([])
    } finally {
      setLoading(false)
    }
  }, [])

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-surface/5 via-background to-surface/5">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
            Find Your
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent ml-3">
              Sound
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            Search through millions of tracks, artists, and albums
          </p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <SearchBar 
              onSearch={handleSearch}
              placeholder="Search songs, artists, albums..."
              className="mx-auto"
            />
          </motion.div>
        </motion.div>

        <AnimatePresence mode="wait">
          {loading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Loading className="min-h-[200px]" />
            </motion.div>
          )}

          {!loading && hasSearched && searchResults.length === 0 && (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Empty
                title="No results found"
                message={`We couldn't find any tracks matching "${searchQuery}". Try different keywords or check your spelling.`}
                icon="Search"
                className="min-h-[300px]"
              />
            </motion.div>
          )}

          {!loading && searchResults.length > 0 && (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center space-x-3 mb-6">
                <ApperIcon name="Music" className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-semibold text-white">
                  Found {searchResults.length} tracks for "{searchQuery}"
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {searchResults.map((song, index) => (
                  <motion.div
                    key={song.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <SongCard
                      song={song}
                      onPlay={onPlay}
                      isPlaying={currentSong?.id === song.id && isPlaying}
                      showPlayCount
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {!loading && !hasSearched && (
            <motion.div
              key="initial"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20"
            >
              <div className="space-y-6">
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <ApperIcon name="Search" className="w-10 h-10 text-gray-500" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-white">Start your musical journey</h3>
                  <p className="text-gray-400">Type in the search bar to discover amazing music</p>
                </div>
                <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <ApperIcon name="Music2" className="w-4 h-4" />
                    <span>Songs</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <ApperIcon name="User" className="w-4 h-4" />
                    <span>Artists</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <ApperIcon name="Album" className="w-4 h-4" />
                    <span>Albums</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default SearchSection
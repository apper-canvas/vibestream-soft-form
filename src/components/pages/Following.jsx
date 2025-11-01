import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"
import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"
import ArtistCard from "@/components/molecules/ArtistCard"
import Loading from "@/components/ui/Loading"
import Empty from "@/components/ui/Empty"
import Error from "@/components/ui/Error"
import artistService from "@/services/api/artistService"

const Following = () => {
  const user = useSelector((state) => state.user.profile)
  const [followedArtists, setFollowedArtists] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadFollowedArtists()
  }, [user])

  const loadFollowedArtists = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await artistService.getFollowedArtists(user.id)
      setFollowedArtists(data)
    } catch (err) {
      setError("Failed to load followed artists")
      toast.error("Failed to load followed artists")
    } finally {
      setLoading(false)
    }
  }

  const handleViewArtist = (artist) => {
    toast.info(`Artist page for ${artist.name} coming soon!`)
  }

  const handleFollow = async (artist) => {
    try {
      await artistService.toggleFollow(artist.id, user.id)
      loadFollowedArtists()
      toast.success(`Unfollowed ${artist.name}`)
    } catch (err) {
      toast.error("Failed to update following")
    }
  }

  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadFollowedArtists} />

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <ApperIcon name="Users" size={32} className="text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-display font-bold text-white">
                Following
              </h1>
              <p className="text-gray-400 mt-1">
                {followedArtists.length} {followedArtists.length === 1 ? "artist" : "artists"}
              </p>
            </div>
          </div>
        </div>

        {followedArtists.length === 0 ? (
          <Empty
            icon="Users"
            title="Not following anyone yet"
            description="Start following artists to see their updates here"
          />
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {followedArtists.map((artist) => (
              <ArtistCard
                key={artist.id}
                artist={artist}
                onViewArtist={() => handleViewArtist(artist)}
                onFollow={() => handleFollow(artist)}
                isFollowing={true}
              />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Following
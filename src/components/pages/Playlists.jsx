import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import PlaylistCard from "@/components/molecules/PlaylistCard"
import CreatePlaylistModal from "@/components/organisms/CreatePlaylistModal"
import Loading from "@/components/ui/Loading"
import Empty from "@/components/ui/Empty"
import Error from "@/components/ui/Error"
import playlistService from "@/services/api/playlistService"

const Playlists = () => {
  const user = useSelector((state) => state.user.profile)
  const navigate = useNavigate()
  const [playlists, setPlaylists] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [deletingId, setDeletingId] = useState(null)

  useEffect(() => {
    loadPlaylists()
  }, [user])

  const loadPlaylists = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await playlistService.getUserPlaylists(user.id)
      setPlaylists(data)
    } catch (err) {
      setError("Failed to load playlists")
      toast.error("Failed to load playlists")
    } finally {
      setLoading(false)
    }
  }

  const handleViewPlaylist = (playlist) => {
    navigate(`/playlists/${playlist.id}`)
  }

  const handleEditPlaylist = (playlist) => {
    navigate(`/playlists/${playlist.id}`)
  }

  const handleDeletePlaylist = async (playlist) => {
    if (!confirm(`Are you sure you want to delete "${playlist.name}"?`)) {
      return
    }

    setDeletingId(playlist.id)
    try {
      await playlistService.delete(playlist.id)
      toast.success("Playlist deleted successfully")
      loadPlaylists()
    } catch (err) {
      toast.error("Failed to delete playlist")
    } finally {
      setDeletingId(null)
    }
  }

  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadPlaylists} />

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-display font-bold text-white mb-2">
              Your Playlists
            </h1>
            <p className="text-gray-400">
              {playlists.length} {playlists.length === 1 ? "playlist" : "playlists"}
            </p>
          </div>

          <Button
            onClick={() => setShowCreateModal(true)}
            variant="gradient"
            size="lg"
          >
            <ApperIcon name="Plus" size={20} className="mr-2" />
            Create Playlist
          </Button>
        </div>

        {playlists.length === 0 ? (
          <Empty
            icon="ListMusic"
            title="No playlists yet"
            description="Create your first playlist to start organizing your favorite music"
            action={{
              label: "Create Playlist",
              onClick: () => setShowCreateModal(true)
            }}
          />
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {playlists.map((playlist) => (
              <div key={playlist.id} className="relative">
                <PlaylistCard
                  playlist={playlist}
                  onViewPlaylist={() => handleViewPlaylist(playlist)}
                  onEdit={() => handleEditPlaylist(playlist)}
                  onDelete={() => handleDeletePlaylist(playlist)}
                  isDeleting={deletingId === playlist.id}
                />
              </div>
            ))}
          </motion.div>
        )}
      </div>

      <CreatePlaylistModal
        isOpen={showCreateModal}
        onClose={() => {
          setShowCreateModal(false)
          loadPlaylists()
        }}
      />
    </div>
  )
}

export default Playlists
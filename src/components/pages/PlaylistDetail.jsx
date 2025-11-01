import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { useParams, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import SongCard from "@/components/molecules/SongCard"
import Loading from "@/components/ui/Loading"
import Empty from "@/components/ui/Empty"
import Error from "@/components/ui/Error"
import usePlayback from "@/hooks/usePlayback"
import playlistService from "@/services/api/playlistService"
import songService from "@/services/api/songService"

const PlaylistDetail = () => {
  const { id } = useParams()
  const user = useSelector((state) => state.user.profile)
  const navigate = useNavigate()
  const playback = usePlayback()
  const [playlist, setPlaylist] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({ name: "", description: "" })

  useEffect(() => {
    loadPlaylist()
  }, [id])

  const loadPlaylist = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await playlistService.getById(parseInt(id))
      if (!data) {
        setError("Playlist not found")
        return
      }
      setPlaylist(data)
      setEditForm({ name: data.name, description: data.description })
    } catch (err) {
      setError("Failed to load playlist")
      toast.error("Failed to load playlist")
    } finally {
      setLoading(false)
    }
  }

  const handlePlay = (song) => {
    playback.playSong(song)
  }

  const handleLike = async (song) => {
    try {
      const isLiked = await songService.toggleLike(song.id, user.id)
      toast.success(isLiked ? "Added to Liked Songs" : "Removed from Liked Songs")
    } catch (err) {
      toast.error("Failed to update liked songs")
    }
  }

  const handleRemoveSong = async (songId) => {
    try {
      await playlistService.removeSong(playlist.id, songId)
      toast.success("Song removed from playlist")
      loadPlaylist()
    } catch (err) {
      toast.error("Failed to remove song")
    }
  }

  const handleSaveEdit = async () => {
    try {
      await playlistService.update(playlist.id, editForm)
      toast.success("Playlist updated successfully")
      setIsEditing(false)
      loadPlaylist()
    } catch (err) {
      toast.error("Failed to update playlist")
    }
  }

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete "${playlist.name}"?`)) {
      return
    }

    try {
      await playlistService.delete(playlist.id)
      toast.success("Playlist deleted successfully")
      navigate("/playlists")
    } catch (err) {
      toast.error("Failed to delete playlist")
    }
  }

  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadPlaylist} />
  if (!playlist) return <Error message="Playlist not found" />

  return (
    <div className="min-h-screen bg-background">
      <div className="h-80 bg-gradient-to-b from-primary/20 to-background relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
        <div className="relative max-w-7xl mx-auto px-8 pt-20 pb-8 flex items-end space-x-6">
          <motion.img
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            src={playlist.coverImage}
            alt={playlist.name}
            className="w-52 h-52 rounded-lg shadow-2xl"
          />
          <div className="flex-1 pb-4">
            <p className="text-sm text-gray-400 uppercase tracking-wide mb-2">Playlist</p>
            {isEditing ? (
              <input
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                className="text-5xl font-display font-bold text-white mb-4 bg-transparent border-b border-gray-600 focus:border-primary outline-none"
              />
            ) : (
              <h1 className="text-5xl font-display font-bold text-white mb-4">
                {playlist.name}
              </h1>
            )}
            {isEditing ? (
              <textarea
                value={editForm.description}
                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                className="text-gray-300 mb-4 w-full bg-transparent border border-gray-600 rounded p-2 focus:border-primary outline-none"
                rows={2}
              />
            ) : (
              <p className="text-gray-300 mb-4">{playlist.description}</p>
            )}
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>{user.name}</span>
              <span>•</span>
              <span>{playlist.songs.length} songs</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="flex items-center space-x-4 mb-8">
          {!isEditing ? (
            <>
              <Button
                onClick={() => setIsEditing(true)}
                variant="outline"
              >
                <ApperIcon name="Edit" size={18} className="mr-2" />
                Edit Playlist
              </Button>
              <Button
                onClick={handleDelete}
                variant="outline"
                className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
              >
                <ApperIcon name="Trash2" size={18} className="mr-2" />
                Delete Playlist
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={handleSaveEdit}
                variant="gradient"
              >
                <ApperIcon name="Check" size={18} className="mr-2" />
                Save Changes
              </Button>
              <Button
                onClick={() => {
                  setIsEditing(false)
                  setEditForm({ name: playlist.name, description: playlist.description })
                }}
                variant="outline"
              >
                Cancel
              </Button>
            </>
          )}
        </div>

        {playlist.songs.length === 0 ? (
          <Empty
            icon="Music"
            title="No songs in this playlist"
            description="Add songs to start building your collection"
          />
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {playlist.songs.map((song) => (
              <div key={song.id} className="relative">
                <SongCard
                  song={song}
                  onPlay={() => handlePlay(song)}
                  onLike={() => handleLike(song)}
                  isPlaying={playback.currentSong?.id === song.id && playback.isPlaying}
                  isLiked={songService.isLiked(song.id, user.id)}
                />
                <button
                  onClick={() => handleRemoveSong(song.id)}
                  className="absolute top-2 right-2 w-8 h-8 rounded-full bg-red-600 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
                >
                  <ApperIcon name="X" size={16} className="text-white" />
                </button>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default PlaylistDetail
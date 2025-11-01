import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import playlistService from "@/services/api/playlistService";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import CreatePlaylistModal from "@/components/organisms/CreatePlaylistModal";
import Loading from "@/components/ui/Loading";
import Empty from "@/components/ui/Empty";
import Error from "@/components/ui/Error";
import PlaylistCard from "@/components/molecules/PlaylistCard";

const Playlists = () => {
  const user = useSelector((state) => state.user.profile)
  const navigate = useNavigate()
  const [playlists, setPlaylists] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [deletingId, setDeletingId] = useState(null)

  useEffect(() => {
    if (user) {
      loadPlaylists()
    }
  }, [user])

  const loadPlaylists = async () => {
    if (!user) return;
    
    try {
      setLoading(true)
      setError(null)
      const data = await playlistService.getUserPlaylists(user.Id)
      setPlaylists(data)
    } catch (err) {
      setError("Failed to load playlists")
      toast.error("Failed to load playlists")
    } finally {
      setLoading(false)
    }
  }

  const handleViewPlaylist = (playlist) => {
    navigate(`/playlists/${playlist.Id}`)
  }

  const handleEditPlaylist = (playlist) => {
    navigate(`/playlists/${playlist.Id}`)
  }

  const handleDeletePlaylist = async (playlist) => {
    if (!confirm(`Are you sure you want to delete "${playlist.name_c}"?`)) {
      return
    }

    setDeletingId(playlist.Id)
    try {
      await playlistService.delete(playlist.Id)
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
    <div className="max-w-7xl mx-auto px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
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
            className="bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80"
          >
            <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
            Create Playlist
          </Button>
        </div>
      </motion.div>

      {playlists.length === 0 ? (
        <Empty
          title="No playlists yet"
          message="Create your first playlist to get started"
          action={{
            label: "Create Playlist",
            onClick: () => setShowCreateModal(true)
          }}
          icon="ListMusic"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {playlists.map((playlist, index) => (
            <motion.div
              key={playlist.Id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <PlaylistCard
                playlist={playlist}
                onViewPlaylist={() => handleViewPlaylist(playlist)}
                onEdit={() => handleEditPlaylist(playlist)}
                onDelete={() => handleDeletePlaylist(playlist)}
                isDeleting={deletingId === playlist.Id}
              />
            </motion.div>
          ))}
        </div>
      )}

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
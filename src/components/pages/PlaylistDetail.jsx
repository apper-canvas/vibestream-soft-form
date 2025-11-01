import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import songService from "@/services/api/songService";
import playlistService from "@/services/api/playlistService";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Loading from "@/components/ui/Loading";
import Empty from "@/components/ui/Empty";
import Error from "@/components/ui/Error";
import SongCard from "@/components/molecules/SongCard";
import usePlayback from "@/hooks/usePlayback";

function PlaylistDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const user = useSelector((state) => state.user.profile)
  const playback = usePlayback()
  const [playlist, setPlaylist] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({ name: "", description: "" })

  useEffect(() => {
    if (id) {
      loadPlaylist()
    }
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
      setEditForm({ name: data.name_c, description: data.description_c })
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
    if (!user) return
    
    try {
      const isLiked = await songService.toggleLike(song.Id, user.Id)
      toast.success(isLiked ? "Added to Liked Songs" : "Removed from Liked Songs")
    } catch (err) {
      toast.error("Failed to update liked songs")
    }
  }

  const handleRemoveSong = async (songId) => {
    try {
      await playlistService.removeSong(playlist.Id, songId)
      toast.success("Song removed from playlist")
      loadPlaylist()
    } catch (err) {
      toast.error("Failed to remove song")
    }
  }

  const handleSaveEdit = async () => {
    try {
      await playlistService.update(playlist.Id, editForm)
      toast.success("Playlist updated successfully")
      setIsEditing(false)
      loadPlaylist()
    } catch (err) {
      toast.error("Failed to update playlist")
    }
  }

  const handleDeletePlaylist = async () => {
    if (!confirm(`Are you sure you want to delete "${playlist?.name_c}"?`)) {
      return
    }

    try {
      await playlistService.delete(playlist.Id)
      toast.success("Playlist deleted successfully")
      navigate("/playlists")
    } catch (err) {
      toast.error("Failed to delete playlist")
    }
  }

  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadPlaylist} />
  if (!playlist) return <Empty title="Playlist not found" message="The playlist you're looking for doesn't exist." />

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="h-80 bg-gradient-to-b from-primary/20 to-background relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
        <div className="relative max-w-7xl mx-auto px-8 pt-20 pb-8 flex items-end space-x-6">
          <motion.img
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-52 h-52 rounded-lg shadow-2xl"
            src={playlist.coverImage_c}
            alt={playlist.name_c}
          />
          <div className="flex-1 pb-4">
            <p className="text-sm text-gray-400 uppercase tracking-wide mb-2">Playlist</p>
            {isEditing ? (
              <input
                type="text"
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                className="text-5xl font-display font-bold text-white mb-4 bg-transparent border-b border-gray-600 focus:border-primary outline-none"
              />
            ) : (
              <h1 className="text-5xl font-display font-bold text-white mb-4">
                {playlist.name_c}
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
              <p className="text-gray-300 mb-4">{playlist.description_c}</p>
            )}

            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>{user?.name || 'Unknown User'}</span>
              <span>•</span>
              <span>{playlist.songs_c?.length || 0} songs</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="sticky top-16 z-30 bg-surface/95 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/80"
                onClick={() => playlist.songs_c?.[0] && handlePlay(playlist.songs_c[0])}
              >
                <ApperIcon name="Play" className="w-5 h-5 mr-2" />
                Play All
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              {isEditing ? (
                <>
                  <Button
                    variant="outline"
                    onClick={handleSaveEdit}
                    className="text-primary border-primary hover:bg-primary/10"
                  >
                    <ApperIcon name="Save" className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsEditing(false)
                      setEditForm({ name: playlist.name_c, description: playlist.description_c })
                    }}
                    className="text-gray-400 border-gray-600 hover:bg-gray-800"
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outline" 
                    onClick={() => setIsEditing(true)}
                    className="text-gray-400 border-gray-600 hover:bg-gray-800"
                  >
                    <ApperIcon name="Edit2" className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleDeletePlaylist}
                    className="text-red-400 border-red-600 hover:bg-red-900/20"
                  >
                    <ApperIcon name="Trash2" className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Songs List */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {playlist.songs_c && playlist.songs_c.length > 0 ? (
          <div className="space-y-2">
            {playlist.songs_c.map((song) => (
              <div key={song.Id} className="relative">
                <SongCard
                  song={song}
                  onPlay={() => handlePlay(song)}
                  onLike={() => handleLike(song)}
                  isPlaying={playback.currentSong?.Id === song.Id && playback.isPlaying}
                  isLiked={songService.isLiked(song.Id, user?.Id)}
                />
                <button
                  onClick={() => handleRemoveSong(song.Id)}
                  className="absolute top-2 right-2 w-8 h-8 rounded-full bg-red-600 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
                >
                  <ApperIcon name="X" className="w-4 h-4 text-white" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <Empty
            title="No songs in this playlist"
            message="Start building your playlist by adding some songs"
            icon="Music"
          />
        )}
      </div>
    </div>
  )
}

export default PlaylistDetail
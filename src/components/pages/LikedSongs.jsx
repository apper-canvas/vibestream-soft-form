import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import songService from "@/services/api/songService";
import ApperIcon from "@/components/ApperIcon";
import Loading from "@/components/ui/Loading";
import Empty from "@/components/ui/Empty";
import Error from "@/components/ui/Error";
import SongCard from "@/components/molecules/SongCard";
import usePlayback from "@/hooks/usePlayback";

const LikedSongs = () => {
  const user = useSelector((state) => state.user.profile)
  const playback = usePlayback()
  const [likedSongs, setLikedSongs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (user) {
      loadLikedSongs()
    }
  }, [user])

  const loadLikedSongs = async () => {
    if (!user) return;
    
    try {
      setLoading(true)
      setError(null)
      const data = await songService.getLikedSongs(user.Id)
      setLikedSongs(data)
    } catch (err) {
      setError("Failed to load liked songs")
      toast.error("Failed to load liked songs")
    } finally {
      setLoading(false)
    }
  }

  const handlePlay = (song) => {
    playback.playSong(song)
  }


  const handleLike = async (song) => {
    if (!user) return;
    
    try {
      await songService.toggleLike(song.Id, user.Id)
      loadLikedSongs()
      toast.success("Removed from Liked Songs")
    } catch (err) {
      toast.error("Failed to update liked songs")
    }
  }

  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadLikedSongs} />

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <ApperIcon name="Heart" size={32} className="text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-display font-bold text-white">
                Liked Songs
              </h1>
              <p className="text-gray-400 mt-1">
                {likedSongs.length} {likedSongs.length === 1 ? "song" : "songs"}
              </p>
            </div>
          </div>
        </div>

        {likedSongs.length === 0 ? (
          <Empty
            icon="Heart"
            title="No liked songs yet"
            description="Start liking songs to see them here"
          />
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {likedSongs.map((song) => (
<SongCard
                key={song.Id}
                song={song}
                onPlay={() => handlePlay(song)}
                onLike={() => handleLike(song)}
                isPlaying={playback.currentSong?.Id === song.Id && playback.isPlaying}
                isLiked={true}
              />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default LikedSongs
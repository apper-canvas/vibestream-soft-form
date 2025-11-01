import { toast } from "react-toastify";
import React from "react";
import FeaturedArtists from "@/components/organisms/FeaturedArtists";
import TopCharts from "@/components/organisms/TopCharts";
import GenreGrid from "@/components/organisms/GenreGrid";
import Hero from "@/components/organisms/Hero";
import MiniPlayer from "@/components/organisms/MiniPlayer";
import TrendingPlaylists from "@/components/organisms/TrendingPlaylists";
import SearchSection from "@/components/organisms/SearchSection";
import usePlayback from "@/hooks/usePlayback";

const Home = () => {
  const playback = usePlayback()

const handlePlay = (song) => {
    playback.playSong(song)
  }

  const handleSelectGenre = (genre) => {
    toast.info(`Browsing ${genre.name} music coming soon!`)
  }

const handleViewPlaylist = (playlistId) => {
    window.location.href = `/playlists/${playlistId}`
  }

const handleViewArtist = (artist) => {
    toast.info(`Viewing artist "${artist.name || 'Unknown Artist'}" coming soon!`)
  }

  const handleSignUp = () => {
    toast.success("Sign up feature coming soon! Thanks for your interest.")
  }

  const handleGetStarted = () => {
    toast.info("Get started feature coming soon!")
  }
  return (
    <div className="min-h-screen bg-background text-white">
      {/* Status Banner */}

      {/* Main Content */}
<div className="pt-6">
        <Hero />
        <GenreGrid onSelectGenre={handleSelectGenre} />
        <TrendingPlaylists onViewPlaylist={handleViewPlaylist} />
        <TopCharts 
          onPlay={handlePlay}
          currentSong={playback.currentSong}
          isPlaying={playback.isPlaying}
        />
        <FeaturedArtists onViewArtist={handleViewArtist} />
        <SearchSection 
          onPlay={handlePlay}
          currentSong={playback.currentSong}
          isPlaying={playback.isPlaying}
        />
      </div>

      {/* Mini Player */}
      <MiniPlayer
        currentSong={playback.currentSong}
        isPlaying={playback.isPlaying}
        currentTime={playback.currentTime}
        volume={playback.volume}
        onTogglePlayback={playback.togglePlayback}
        onSeek={playback.seekTo}
        onVolumeChange={playback.setVolume}
        getDuration={playback.getDuration}
      />


      {/* Bottom spacing for mini player */}
      <div className={playback.currentSong ? "h-20" : "h-0"} />
    </div>
  )
}

export default Home
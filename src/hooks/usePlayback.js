import { useCallback, useEffect, useRef, useState } from "react";

const usePlayback = () => {
  const audioRef = useRef(null)
  const audioContextRef = useRef(null)
  const analyserRef = useRef(null)
  const dataArrayRef = useRef(null)
const [currentSong, setCurrentSong] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPreviewPlaying, setIsPreviewPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const previewAudioRef = useRef(null)
  const previewTimeoutRef = useRef(null)
// Load initial state from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('vibestream_playback')
    if (saved) {
      const parsed = JSON.parse(saved)
      setVolume(parsed.volume || 0.7)
    }
  }, [])
// Save state to localStorage
  useEffect(() => {
    const state = {
      volume
    }
    localStorage.setItem('vibestream_playback', JSON.stringify(state))
  }, [volume])

  // Initialize audio element
useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio()
      audioRef.current.preload = 'metadata'
      audioRef.current.crossOrigin = 'anonymous'
      
      // Initialize Web Audio API for visualization
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext
        audioContextRef.current = new AudioContext()
        analyserRef.current = audioContextRef.current.createAnalyser()
        analyserRef.current.fftSize = 256
        
        const bufferLength = analyserRef.current.frequencyBinCount
        dataArrayRef.current = new Uint8Array(bufferLength)
        
        const source = audioContextRef.current.createMediaElementSource(audioRef.current)
        source.connect(analyserRef.current)
        analyserRef.current.connect(audioContextRef.current.destination)
      } catch (error) {
        console.warn('Web Audio API not supported:', error)
      }
      
      const updateTime = () => setCurrentTime(audioRef.current.currentTime)
      const handleEnded = () => setIsPlaying(false)
      
      audioRef.current.addEventListener('timeupdate', updateTime)
      audioRef.current.addEventListener('ended', handleEnded)
      
      return () => {
        audioRef.current?.removeEventListener('timeupdate', updateTime)
        audioRef.current?.removeEventListener('ended', handleEnded)
        audioContextRef.current?.close()
      }
    }
  }, [])

  // Update volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

const previewSong = useCallback((song) => {
    // Stop any existing preview
    if (previewAudioRef.current) {
      previewAudioRef.current.pause()
      previewAudioRef.current = null
    }
    
    // Clear existing timeout
    if (previewTimeoutRef.current) {
      clearTimeout(previewTimeoutRef.current)
      previewTimeoutRef.current = null
    }

    // Create new preview audio instance
    const previewAudio = new Audio(song.previewUrl || song.audioUrl)
    previewAudio.volume = volume
    previewAudioRef.current = previewAudio

    previewAudio.play()
      .then(() => {
        setIsPreviewPlaying(true)
        
        // Auto-stop after 10 seconds
        previewTimeoutRef.current = setTimeout(() => {
          if (previewAudioRef.current) {
            previewAudioRef.current.pause()
            previewAudioRef.current = null
          }
          setIsPreviewPlaying(false)
          previewTimeoutRef.current = null
        }, 10000)
      })
      .catch(console.error)
  }, [volume])

  const stopPreview = useCallback(() => {
    if (previewAudioRef.current) {
      previewAudioRef.current.pause()
      previewAudioRef.current = null
    }
    
    if (previewTimeoutRef.current) {
      clearTimeout(previewTimeoutRef.current)
      previewTimeoutRef.current = null
    }
    
    setIsPreviewPlaying(false)
  }, [])

  const playSong = useCallback((song) => {
if (!audioRef.current) return false
    
    // Stop any active preview first
    stopPreview()
    
    // Premium users have unlimited playback
    if (!currentSong || currentSong.id !== song.id) {
      setCurrentSong(song)
      audioRef.current.src = song.audioUrl
      audioRef.current.load()
    }

    audioRef.current.play()
      .then(() => setIsPlaying(true))
      .catch(console.error)
    
    return true
  }, [currentSong, stopPreview])

const pauseSong = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      setIsPlaying(false)
    }
  }, [])

  const togglePlayback = useCallback(() => {
    if (isPlaying) {
      pauseSong()
    } else if (currentSong) {
      playSong(currentSong)
    }
  }, [isPlaying, currentSong, playSong, pauseSong])

  const seekTo = useCallback((time) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time
      setCurrentTime(time)
    }
  }, [])

  const getDuration = useCallback(() => {
    return audioRef.current?.duration || 0
  }, [])

const getFrequencyData = useCallback(() => {
    if (!analyserRef.current || !dataArrayRef.current) {
      return new Array(32).fill(0)
    }
    
    analyserRef.current.getByteFrequencyData(dataArrayRef.current)
    
    // Sample 32 bars from the frequency data
    const bars = 32
    const step = Math.floor(dataArrayRef.current.length / bars)
    const normalized = []
    
    for (let i = 0; i < bars; i++) {
      const index = i * step
      normalized.push(dataArrayRef.current[index] / 255)
    }
    
return normalized
  }, [])

  // Cleanup preview on unmount
  useEffect(() => {
    return () => {
      if (previewAudioRef.current) {
        previewAudioRef.current.pause()
        previewAudioRef.current = null
      }
      if (previewTimeoutRef.current) {
        clearTimeout(previewTimeoutRef.current)
      }
    }
  }, [])

return {
    currentSong,
    isPlaying,
    isPreviewPlaying,
    currentTime,
    volume,
    playSong,
    pauseSong,
    previewSong,
    stopPreview,
    togglePlayback,
    seekTo,
    getDuration,
    setVolume,
    getFrequencyData,
    audioRef
  }
}

export default usePlayback
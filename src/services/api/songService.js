import songsData from "@/services/mockData/songs.json";
import React from "react";

class SongService {
  constructor() {
    this.songs = [...songsData]
    const stored = localStorage.getItem('vibestream_liked_songs')
    this.likedSongs = stored ? JSON.parse(stored) : []
  }

saveToStorage() {
    localStorage.setItem('vibestream_liked_songs', JSON.stringify(this.likedSongs))
  }

  async getAll() {
    await this.delay(300)
    return [...this.songs]
  }

  async getById(id) {
    await this.delay(200)
    return this.songs.find(song => song.id === id) || null
  }

  async getByGenre(genre) {
    await this.delay(250)
    return this.songs.filter(song => song.genre === genre)
  }

  async search(query) {
    await this.delay(200)
    if (!query.trim()) return []
    
    const searchTerm = query.toLowerCase()
    return this.songs.filter(song =>
      song.title.toLowerCase().includes(searchTerm) ||
      song.artist.toLowerCase().includes(searchTerm) ||
      song.album.toLowerCase().includes(searchTerm)
    )
  }

  async getTopCharts(limit = 10) {
    await this.delay(300)
    const sorted = [...this.songs].sort((a, b) => b.playCount - a.playCount)
    return sorted.slice(0, limit).map((song, index) => ({
      rank: index + 1,
      song,
      previousRank: index + 1 + Math.floor(Math.random() * 3) - 1
    }))
}

  async getPreviewUrl(id) {
    await this.delay(100)
    const song = this.songs.find(s => s.id === id)
    if (!song) return null
    
    return `https://cdn.vibestream.io/previews/song-${id}-preview.mp3`
  }

  async toggleLike(songId, userId) {
    await this.delay(200)
    const likeKey = `${userId}_${songId}`
    const index = this.likedSongs.indexOf(likeKey)
    
    if (index > -1) {
      this.likedSongs.splice(index, 1)
      this.saveToStorage()
      return false
    } else {
      this.likedSongs.push(likeKey)
      this.saveToStorage()
      return true
    }
  }

  async getLikedSongs(userId) {
    await this.delay(300)
    const userLikes = this.likedSongs
      .filter(like => like.startsWith(`${userId}_`))
      .map(like => parseInt(like.split('_')[1]))
    
    return this.songs.filter(song => userLikes.includes(song.id))
  }

  isLiked(songId, userId) {
    const likeKey = `${userId}_${songId}`
    return this.likedSongs.includes(likeKey)
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}

export default new SongService()
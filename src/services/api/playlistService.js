import playlistsData from "@/services/mockData/playlists.json"
import songsData from "@/services/mockData/songs.json"

class PlaylistService {
  constructor() {
    const stored = localStorage.getItem('vibestream_playlists')
    this.playlists = stored ? JSON.parse(stored) : [...playlistsData]
    this.songs = [...songsData]
    this.nextId = Math.max(...this.playlists.map(p => p.id), 0) + 1
  }

  saveToStorage() {
    localStorage.setItem('vibestream_playlists', JSON.stringify(this.playlists))
  }

async getAll() {
    await this.delay(300)
    return [...this.playlists]
  }

  async getById(id) {
    await this.delay(200)
    const playlist = this.playlists.find(p => p.id === id)
    if (!playlist) return null

    // Populate songs
    const fullSongs = playlist.songs
      .map(songId => this.songs.find(s => s.id === songId))
      .filter(Boolean)

    return {
      ...playlist,
      songs: fullSongs
    }
  }

  async getUserPlaylists(userId) {
    await this.delay(300)
    return this.playlists.filter(p => p.userId === userId)
  }

  async getTrending(limit = 8) {
    await this.delay(300)
    const shuffled = [...this.playlists].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, limit)
  }

  async create(playlistData) {
    await this.delay(300)
    const newPlaylist = {
      id: this.nextId++,
      ...playlistData,
      songs: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    this.playlists.push(newPlaylist)
    this.saveToStorage()
    return newPlaylist
  }

  async update(id, data) {
    await this.delay(300)
    const index = this.playlists.findIndex(p => p.id === id)
    if (index === -1) throw new Error('Playlist not found')

    this.playlists[index] = {
      ...this.playlists[index],
      ...data,
      updatedAt: new Date().toISOString()
    }
    this.saveToStorage()
    return this.playlists[index]
  }

  async delete(id) {
    await this.delay(300)
    const index = this.playlists.findIndex(p => p.id === id)
    if (index === -1) throw new Error('Playlist not found')

    this.playlists.splice(index, 1)
    this.saveToStorage()
    return true
  }

  async addSong(playlistId, songId) {
    await this.delay(200)
    const playlist = this.playlists.find(p => p.id === playlistId)
    if (!playlist) throw new Error('Playlist not found')

    if (!playlist.songs.includes(songId)) {
      playlist.songs.push(songId)
      playlist.updatedAt = new Date().toISOString()
      this.saveToStorage()
    }
    return playlist
  }

  async removeSong(playlistId, songId) {
    await this.delay(200)
    const playlist = this.playlists.find(p => p.id === playlistId)
    if (!playlist) throw new Error('Playlist not found')

    playlist.songs = playlist.songs.filter(id => id !== songId)
    playlist.updatedAt = new Date().toISOString()
    this.saveToStorage()
    return playlist
  }

  async reorderSongs(playlistId, songIds) {
    await this.delay(200)
    const playlist = this.playlists.find(p => p.id === playlistId)
    if (!playlist) throw new Error('Playlist not found')

    playlist.songs = songIds
    playlist.updatedAt = new Date().toISOString()
    this.saveToStorage()
    return playlist
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}

export default new PlaylistService()
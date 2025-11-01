import artistsData from "@/services/mockData/artists.json";
import songsData from "@/services/mockData/songs.json";
import React from "react";

class ArtistService {
  constructor() {
    this.artists = [...artistsData]
    this.songs = [...songsData]
    const stored = localStorage.getItem('vibestream_following')
    this.following = stored ? JSON.parse(stored) : []
  }

saveToStorage() {
    localStorage.setItem('vibestream_following', JSON.stringify(this.following))
  }

  async getAll() {
    await this.delay(300)
    return [...this.artists]
  }

  async getById(id) {
    await this.delay(200)
    const artist = this.artists.find(a => a.id === id)
    if (!artist) return null

    const topSongs = artist.topSongs
      .map(songId => this.songs.find(s => s.id === songId))
      .filter(Boolean)

    return {
      ...artist,
      topSongs
    }
  }

  async getFeatured(limit = 6) {
    await this.delay(300)
    const sorted = [...this.artists].sort((a, b) => b.followerCount - a.followerCount)
    return sorted.slice(0, limit)
  }

  async toggleFollow(artistId, userId) {
    await this.delay(200)
    const followKey = `${userId}_${artistId}`
    const index = this.following.indexOf(followKey)
    
    if (index > -1) {
      this.following.splice(index, 1)
      this.saveToStorage()
      return false
    } else {
      this.following.push(followKey)
      this.saveToStorage()
      return true
    }
  }

  async getFollowedArtists(userId) {
    await this.delay(300)
    const userFollows = this.following
      .filter(follow => follow.startsWith(`${userId}_`))
      .map(follow => parseInt(follow.split('_')[1]))
    
    return this.artists.filter(artist => userFollows.includes(artist.id))
  }

  isFollowing(artistId, userId) {
    const followKey = `${userId}_${artistId}`
    return this.following.includes(followKey)
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}

export default new ArtistService()
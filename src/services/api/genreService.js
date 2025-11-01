import genresData from "@/services/mockData/genres.json"

class GenreService {
  constructor() {
    this.genres = [...genresData]
  }

  async getAll() {
    await this.delay(300)
    return [...this.genres]
  }

  async getById(id) {
    await this.delay(200)
    return this.genres.find(genre => genre.id === id) || null
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}

export default new GenreService()
import { getApperClient } from "@/services/apperClient"

class SongService {
  constructor() {
    this.tableName = 'songs_c'
    this.likedSongsTable = 'user_liked_songs_c' // Would need to be created for user-specific likes
  }

  async getAll() {
    try {
      const apperClient = getApperClient();
      if (!apperClient) throw new Error('ApperClient not available');
      
      const response = await apperClient.fetchRecords(this.tableName, {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "artist_c"}},
          {"field": {"Name": "album_c"}},
          {"field": {"Name": "albumArt_c"}},
          {"field": {"Name": "duration_c"}},
          {"field": {"Name": "playCount_c"}},
          {"field": {"Name": "audioUrl_c"}},
          {"field": {"Name": "genre_c"}}
        ]
      });

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching songs:", error?.response?.data?.message || error);
      throw error;
    }
  }

  async getById(id) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) throw new Error('ApperClient not available');
      
      const response = await apperClient.getRecordById(this.tableName, parseInt(id), {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "artist_c"}},
          {"field": {"Name": "album_c"}},
          {"field": {"Name": "albumArt_c"}},
          {"field": {"Name": "duration_c"}},
          {"field": {"Name": "playCount_c"}},
          {"field": {"Name": "audioUrl_c"}},
          {"field": {"Name": "genre_c"}}
        ]
      });

      if (!response.success) {
        console.error(response.message);
        return null;
      }

      return response.data || null;
    } catch (error) {
      console.error(`Error fetching song ${id}:`, error?.response?.data?.message || error);
      return null;
    }
  }

  async getByGenre(genreId) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) throw new Error('ApperClient not available');
      
      const response = await apperClient.fetchRecords(this.tableName, {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "artist_c"}},
          {"field": {"Name": "album_c"}},
          {"field": {"Name": "albumArt_c"}},
          {"field": {"Name": "duration_c"}},
          {"field": {"Name": "playCount_c"}},
          {"field": {"Name": "audioUrl_c"}},
          {"field": {"Name": "genre_c"}}
        ],
        where: [{
          "FieldName": "genre_c",
          "Operator": "EqualTo", 
          "Values": [parseInt(genreId)]
        }]
      });

      if (!response.success) {
        console.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching songs by genre:", error?.response?.data?.message || error);
      return [];
    }
  }

  async search(query) {
    if (!query.trim()) return []
    
    try {
      const apperClient = getApperClient();
      if (!apperClient) throw new Error('ApperClient not available');
      
      const response = await apperClient.fetchRecords(this.tableName, {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "artist_c"}},
          {"field": {"Name": "album_c"}},
          {"field": {"Name": "albumArt_c"}},
          {"field": {"Name": "duration_c"}},
          {"field": {"Name": "playCount_c"}},
          {"field": {"Name": "audioUrl_c"}},
          {"field": {"Name": "genre_c"}}
        ],
        whereGroups: [{
          "operator": "OR",
          "subGroups": [
            {
              "conditions": [
                {
                  "fieldName": "title_c",
                  "operator": "Contains",
                  "values": [query]
                }
              ]
            },
            {
              "conditions": [
                {
                  "fieldName": "artist_c", 
                  "operator": "Contains",
                  "values": [query]
                }
              ]
            },
            {
              "conditions": [
                {
                  "fieldName": "album_c",
                  "operator": "Contains", 
                  "values": [query]
                }
              ]
            }
          ]
        }]
      });

      if (!response.success) {
        console.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error searching songs:", error?.response?.data?.message || error);
      return [];
    }
  }

  async getTopCharts(limit = 10) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) throw new Error('ApperClient not available');
      
      const response = await apperClient.fetchRecords(this.tableName, {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "artist_c"}},
          {"field": {"Name": "album_c"}},
          {"field": {"Name": "albumArt_c"}},
          {"field": {"Name": "duration_c"}},
          {"field": {"Name": "playCount_c"}},
          {"field": {"Name": "audioUrl_c"}},
          {"field": {"Name": "genre_c"}}
        ],
        orderBy: [{
          "fieldName": "playCount_c",
          "sorttype": "DESC"
        }],
        pagingInfo: {
          "limit": limit,
          "offset": 0
        }
      });

      if (!response.success) {
        console.error(response.message);
        return [];
      }

      const songs = response.data || [];
      return songs.map((song, index) => ({
        rank: index + 1,
        song,
        previousRank: index + 1 + Math.floor(Math.random() * 3) - 1
      }));
    } catch (error) {
      console.error("Error fetching top charts:", error?.response?.data?.message || error);
      return [];
    }
  }

  async getPreviewUrl(id) {
    // This would typically come from the song's audioUrl_c field
    // For now, return a placeholder preview URL
    return `https://cdn.vibestream.io/previews/song-${id}-preview.mp3`
  }

  async toggleLike(songId, userId) {
    // This would require a user_liked_songs table to track likes
    // For now, return a mock response
    // In a real implementation, this would create/delete records in a junction table
    try {
      // Mock implementation - would need proper database table
      const isLiked = Math.random() > 0.5; // Random for demo
      return isLiked;
    } catch (error) {
      console.error("Error toggling like:", error);
      throw error;
    }
  }

  async getLikedSongs(userId) {
    // This would query a user_liked_songs junction table
    // For now, return empty array as table doesn't exist yet
    try {
      return [];
    } catch (error) {
      console.error("Error fetching liked songs:", error);
      return [];
    }
  }

  isLiked(songId, userId) {
    // This would check the user_liked_songs table
    // For now, return false as functionality requires additional table
    return false;
  }
}

export default new SongService()
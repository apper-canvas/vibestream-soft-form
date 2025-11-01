import { getApperClient } from "@/services/apperClient"

class PlaylistService {
  constructor() {
    this.tableName = 'playlists_c'
  }

  async getAll() {
    try {
      const apperClient = getApperClient();
      if (!apperClient) throw new Error('ApperClient not available');
      
      const response = await apperClient.fetchRecords(this.tableName, {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "coverImage_c"}},
          {"field": {"Name": "userId_c"}},
          {"field": {"Name": "songs_c"}}
        ]
      });

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching playlists:", error?.response?.data?.message || error);
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
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "coverImage_c"}},
          {"field": {"Name": "userId_c"}},
          {"field": {"Name": "songs_c"}}
        ]
      });

      if (!response.success) {
        console.error(response.message);
        return null;
      }

      const playlist = response.data;
      if (!playlist) return null;

      // songs_c is a lookup field that would return song objects automatically
      // The lookup field handling is automatic with ApperClient
      return playlist;
    } catch (error) {
      console.error(`Error fetching playlist ${id}:`, error?.response?.data?.message || error);
      return null;
    }
  }

  async getUserPlaylists(userId) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) throw new Error('ApperClient not available');
      
      const response = await apperClient.fetchRecords(this.tableName, {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "coverImage_c"}},
          {"field": {"Name": "userId_c"}},
          {"field": {"Name": "songs_c"}}
        ],
        where: [{
          "FieldName": "userId_c",
          "Operator": "EqualTo",
          "Values": [parseInt(userId)]
        }]
      });

      if (!response.success) {
        console.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching user playlists:", error?.response?.data?.message || error);
      return [];
    }
  }

  async getTrending(limit = 8) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) throw new Error('ApperClient not available');
      
      const response = await apperClient.fetchRecords(this.tableName, {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "coverImage_c"}},
          {"field": {"Name": "userId_c"}},
          {"field": {"Name": "songs_c"}}
        ],
        pagingInfo: {
          "limit": limit,
          "offset": 0
        }
      });

      if (!response.success) {
        console.error(response.message);
        return [];
      }

      // Shuffle for trending effect
      const data = response.data || [];
      return data.sort(() => Math.random() - 0.5);
    } catch (error) {
      console.error("Error fetching trending playlists:", error?.response?.data?.message || error);
      return [];
    }
  }

  async create(playlistData) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) throw new Error('ApperClient not available');
      
      const response = await apperClient.createRecord(this.tableName, {
        records: [{
          name_c: playlistData.name,
          description_c: playlistData.description || '',
          coverImage_c: playlistData.coverImage || '',
          userId_c: parseInt(playlistData.userId)
        }]
      });

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to create ${failed.length} playlists:`, failed);
          failed.forEach(record => {
            if (record.message) throw new Error(record.message);
          });
        }
        return successful[0]?.data || null;
      }
    } catch (error) {
      console.error("Error creating playlist:", error?.response?.data?.message || error);
      throw error;
    }
  }

  async update(id, data) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) throw new Error('ApperClient not available');
      
      const updateData = {};
      if (data.name !== undefined) updateData.name_c = data.name;
      if (data.description !== undefined) updateData.description_c = data.description;
      if (data.coverImage !== undefined) updateData.coverImage_c = data.coverImage;

      const response = await apperClient.updateRecord(this.tableName, {
        records: [{
          Id: parseInt(id),
          ...updateData
        }]
      });

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to update ${failed.length} playlists:`, failed);
          failed.forEach(record => {
            if (record.message) throw new Error(record.message);
          });
        }
        return successful[0]?.data || null;
      }
    } catch (error) {
      console.error("Error updating playlist:", error?.response?.data?.message || error);
      throw error;
    }
  }

  async delete(id) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) throw new Error('ApperClient not available');
      
      const response = await apperClient.deleteRecord(this.tableName, {
        RecordIds: [parseInt(id)]
      });

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to delete ${failed.length} playlists:`, failed);
          failed.forEach(record => {
            if (record.message) throw new Error(record.message);
          });
        }
        return successful.length > 0;
      }
    } catch (error) {
      console.error("Error deleting playlist:", error?.response?.data?.message || error);
      throw error;
    }
  }

  async addSong(playlistId, songId) {
    // This would require updating the songs_c lookup field
    // The exact implementation depends on how the lookup relationship is configured
    try {
      // For now, this is a placeholder - would need proper lookup field update
      console.log(`Adding song ${songId} to playlist ${playlistId}`);
      return true;
    } catch (error) {
      console.error("Error adding song to playlist:", error);
      throw error;
    }
  }

  async removeSong(playlistId, songId) {
    // This would require updating the songs_c lookup field  
    // The exact implementation depends on how the lookup relationship is configured
    try {
      // For now, this is a placeholder - would need proper lookup field update
      console.log(`Removing song ${songId} from playlist ${playlistId}`);
      return true;
    } catch (error) {
      console.error("Error removing song from playlist:", error);
      throw error;
    }
  }

  async reorderSongs(playlistId, songIds) {
    // This would require updating the songs_c lookup field with new order
    // The exact implementation depends on how the lookup relationship is configured
    try {
      // For now, this is a placeholder - would need proper lookup field update
      console.log(`Reordering songs in playlist ${playlistId}:`, songIds);
      return true;
    } catch (error) {
      console.error("Error reordering playlist songs:", error);
      throw error;
    }
  }
}

export default new PlaylistService()
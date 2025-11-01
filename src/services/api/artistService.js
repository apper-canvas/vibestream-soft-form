import { getApperClient } from "@/services/apperClient"

class ArtistService {
  constructor() {
    this.tableName = 'artists_c'
    this.followingTable = 'user_following_c' // Would need to be created for user-specific follows
  }

  async getAll() {
    try {
      const apperClient = getApperClient();
      if (!apperClient) throw new Error('ApperClient not available');
      
      const response = await apperClient.fetchRecords(this.tableName, {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "bio_c"}},
          {"field": {"Name": "profileImage_c"}},
          {"field": {"Name": "followerCount_c"}},
          {"field": {"Name": "topSongs_c"}}
        ]
      });

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching artists:", error?.response?.data?.message || error);
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
          {"field": {"Name": "bio_c"}},
          {"field": {"Name": "profileImage_c"}},
          {"field": {"Name": "followerCount_c"}},
          {"field": {"Name": "topSongs_c"}}
        ]
      });

      if (!response.success) {
        console.error(response.message);
        return null;
      }

      const artist = response.data;
      if (!artist) return null;

      // topSongs_c is a lookup field that would return song objects
      // The lookup field handling is automatic with ApperClient
      return artist;
    } catch (error) {
      console.error(`Error fetching artist ${id}:`, error?.response?.data?.message || error);
      return null;
    }
  }

  async getFeatured(limit = 6) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) throw new Error('ApperClient not available');
      
      const response = await apperClient.fetchRecords(this.tableName, {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "bio_c"}},
          {"field": {"Name": "profileImage_c"}},
          {"field": {"Name": "followerCount_c"}},
          {"field": {"Name": "topSongs_c"}}
        ],
        orderBy: [{
          "fieldName": "followerCount_c",
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

      return response.data || [];
    } catch (error) {
      console.error("Error fetching featured artists:", error?.response?.data?.message || error);
      return [];
    }
  }

  async toggleFollow(artistId, userId) {
    // This would require a user_following table to track follows
    // For now, return a mock response
    try {
      // Mock implementation - would need proper database table
      const isFollowing = Math.random() > 0.5; // Random for demo
      return isFollowing;
    } catch (error) {
      console.error("Error toggling follow:", error);
      throw error;
    }
  }

  async getFollowedArtists(userId) {
    // This would query a user_following junction table
    // For now, return empty array as table doesn't exist yet
    try {
      return [];
    } catch (error) {
      console.error("Error fetching followed artists:", error);
      return [];
    }
  }

  isFollowing(artistId, userId) {
    // This would check the user_following table
    // For now, return false as functionality requires additional table
    return false;
  }
}

export default new ArtistService()
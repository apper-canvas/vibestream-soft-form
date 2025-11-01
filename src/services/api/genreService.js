import { getApperClient } from "@/services/apperClient"

class GenreService {
  constructor() {
    this.tableName = 'genres_c'
  }

  async getAll() {
    try {
      const apperClient = getApperClient();
      if (!apperClient) throw new Error('ApperClient not available');
      
      const response = await apperClient.fetchRecords(this.tableName, {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "name_c"}}, 
          {"field": {"Name": "icon_c"}}
        ]
      });

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching genres:", error?.response?.data?.message || error);
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
          {"field": {"Name": "icon_c"}}
        ]
      });

      if (!response.success) {
        console.error(response.message);
        return null;
      }

      return response.data || null;
    } catch (error) {
      console.error(`Error fetching genre ${id}:`, error?.response?.data?.message || error);
      return null;
    }
  }
}

export default new GenreService()
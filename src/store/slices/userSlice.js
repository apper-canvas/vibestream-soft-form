import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  profile: {
    id: 1,
    name: 'Premium User',
    email: 'premium@vibestream.com',
    avatar: 'https://ui-avatars.com/api/?name=Premium+User&background=1DB954&color=fff',
    isPremium: true,
    memberSince: '2024-01-01'
  },
  loading: false,
  error: null
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload
      state.loading = false
      state.error = null
    },
    updateProfile: (state, action) => {
      state.profile = { ...state.profile, ...action.payload }
    },
    clearProfile: (state) => {
      state.profile = null
      state.loading = false
      state.error = null
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
      state.loading = false
    }
  }
})

export const { setProfile, updateProfile, clearProfile, setLoading, setError } = userSlice.actions
export default userSlice.reducer
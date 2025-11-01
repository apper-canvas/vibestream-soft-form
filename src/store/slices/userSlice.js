import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  profile: null,
  isAuthenticated: false,
  isInitialized: false,
  loading: false,
  error: null
}

const userSlice = createSlice({
  name: 'user',
  initialState,
reducers: {
    setProfile: (state, action) => {
      state.profile = JSON.parse(JSON.stringify(action.payload));
      state.isAuthenticated = !!action.payload;
      state.loading = false;
      state.error = null;
    },
    updateProfile: (state, action) => {
      state.profile = { ...state.profile, ...action.payload };
    },
    clearProfile: (state) => {
      state.profile = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
    setInitialized: (state, action) => {
      state.isInitialized = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    }
  }
})

export const { setProfile, updateProfile, clearProfile, setLoading, setError } = userSlice.actions
export default userSlice.reducer
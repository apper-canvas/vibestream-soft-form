import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAuthenticated: true,
  token: 'mock-premium-token',
  loading: false,
  error: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true
      state.token = action.payload.token
      state.loading = false
      state.error = null
    },
    logout: (state) => {
      state.isAuthenticated = false
      state.token = null
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

export const { loginSuccess, logout, setLoading, setError } = authSlice.actions
export default authSlice.reducer
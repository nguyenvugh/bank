import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { login } from "../../services/login"

export const loginAction = createAsyncThunk("user/login", async (params) => {
  const { username, password } = params
  const rs = await login(username, password)
  localStorage.setItem("token", rs.accessToken)
  return rs
})
const loginSlice = createSlice({
  name: "login",
  initialState: {
    token: "",
    loading: true,
    error: "",
  },
  reducers: {},
  extraReducers: {
    [loginAction.pending]: (state) => {
      state.loading = true
    },
    [loginAction.rejected]: (state, action) => {
      state.loading = false
      state.error = action.error
    },
    [loginAction.fulfilled]: (state, action) => {
      state.loading = false
      state.token = action.payload
    },
  },
})

const { reducer } = loginSlice

export default reducer

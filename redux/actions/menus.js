import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import {
  createNewMenus,
  deleteMenusById,
  updateMenusById,
} from "../../services/menus"

export const createMenu = createAsyncThunk(
  "menus/createMenu",
  async (payload) => {
    return await createNewMenus(payload)
  }
)

export const deleteMenu = createAsyncThunk(
  "menus/createMenu",
  async (payload) => {
    return await deleteMenusById(payload)
  }
)

export const updateMenu = createAsyncThunk(
  "menus/updateMenu",
  async (payload) => {
    return await updateMenusById(payload)
  }
)

const menuSlice = createSlice({
  name: "menus",
  initialState: {
    menus: [],
    loading: true,
    error: "",
  },
  reducers: {},
  extraReducers: {
    [createMenu.pending]: () => {},
    [createMenu.rejected]: () => {},
    [createMenu.fulfilled]: () => {},
  },
})

const { reducer } = menuSlice

export default reducer

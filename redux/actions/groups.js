import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { get, remove, set } from "lodash"
import {
  getAllGroups,
  createNewGroup,
  deleteGroupById,
  editGroupById,
} from "../../services/group"
import replaceObjectById from "../../utils/object.utils"

export const getGroups = createAsyncThunk("groups/getGroups", async () => {
  return await getAllGroups()
})

export const createGroup = createAsyncThunk(
  "groups/createGroup",
  async (payload) => {
    return await createNewGroup(payload)
  }
)

export const deleteGroup = createAsyncThunk(
  "groups/deleteGroup",
  async (payload) => {
    return { ...(await deleteGroupById(payload)), ...payload }
  }
)
export const updateGroup = createAsyncThunk(
  "groups/updateGroup",
  async (payload) => {
    return { ...(await editGroupById(payload)), ...payload }
  }
)

const groupSlice = createSlice({
  name: "groups",
  initialState: {
    groups: [],
    createLoading: false,
    error: "",
  },
  reducers: {},
  extraReducers: {
    [getGroups.fulfilled]: (state, action) => {
      state.groups = action.payload.groups
    },
    [createGroup.pending]: (state) => {
      state.createLoading = true
    },
    [createGroup.fulfilled]: (state, action) => {
      state.createLoading = false
      state.groups = [...state.groups, action.payload.newGroup]
    },
    [createGroup.rejected]: (state) => {
      state.createLoading = false
    },
    [deleteGroup.fulfilled]: (state, action) => {
      state.groups = remove([...state.groups], function (it) {
        return it._id !== get(action, "payload.groupId", "")
      })
    },
    [updateGroup.fulfilled]: (state, action) => {
      const gr = state.groups.find(
        (e) => e._id === get(action, "payload.groupId", "")
      )
      set(gr, "title", get(action, "payload.title", ""))
      state.groups = replaceObjectById(state.groups, gr)
    },
  },
})

const { reducer } = groupSlice

export default reducer

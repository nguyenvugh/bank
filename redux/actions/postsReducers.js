import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { get, remove, set } from "lodash"
import {
  getAllPosts,
  createNewPost,
  deletePosts,
  editPostsById,
} from "../../services/postsService"
import replaceObjectById from "../../utils/object.utils"

export const getPosts = createAsyncThunk("groups/getPosts", async () => {
  return await getAllPosts()
})

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (payload) => {
    return await createNewPost(payload)
  }
)

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (payload) => {
    return { ...(await deletePosts(payload)), ...payload }
  }
)
export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async (payload) => {
    return { ...(await editPostsById(payload)), ...payload }
  }
)

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    createLoading: false,
    error: "",
  },
  reducers: {},
  extraReducers: {
    [getPosts.fulfilled]: (state, action) => {
      state.posts = action.payload.posts
    },
    [createPost.pending]: (state) => {
      state.createLoading = true
    },
    [createPost.fulfilled]: (state, action) => {
      state.createLoading = false
      state.posts = [...state.posts, action.payload.newPost]
    },
    [createPost.rejected]: (state) => {
      state.createLoading = false
    },
    [deletePost.fulfilled]: (state, action) => {
      state.posts = remove([...state.posts], function (it) {
        return it._id !== get(action, "payload.postId", "")
      })
    },
    [updatePost.fulfilled]: (state, action) => {
      const gr = state.posts.find(
        (e) => e._id === get(action, "payload.postId", "")
      )
      set(gr, "title", get(action, "payload.title", ""))
      state.posts = replaceObjectById(state.posts, gr)
    },
  },
})

const { reducer } = postsSlice

export default reducer

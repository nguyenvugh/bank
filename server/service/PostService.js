import { makeResBody } from "../../utils/utils"
import connectDb from "../mongo/database"
import Post from "../models/Post"
import { get } from "lodash"

export async function createPost(payload) {
  const { title, content, group, imgSrc } = payload
  if (!title) {
    return makeResBody(400, { error: "title is required" })
  }

  await connectDb()

  const newPost = new Post({
    title,
    content,
    group,
    imgSrc,
  })
  await newPost.save()
  return makeResBody(201, { newPost })
}

export async function getAllPost() {
  await connectDb()
  const posts = await Post.find({})

  return makeResBody(200, { posts })
}

export async function deletePostById(postId) {
  if (!postId) {
    return makeResBody(400, { error: "postId is required" })
  }
  await connectDb()
  let result = {}
  await Post.findByIdAndDelete(postId, function (err, post) {
    if (err) {
      result = makeResBody(400, {
        err,
      })
    } else {
      result = makeResBody(200, {
        post,
      })
    }
  })

  return makeResBody(200, { post: get(result, "body.post", null) })
}

export async function updatePostById(payload) {
  const { postId, title, content, group, imgSrc } = payload
  if (!postId) {
    return makeResBody(400, { error: "postId is required" })
  }
  await connectDb()
  let result = {}
  await Post.findByIdAndUpdate(
    postId,
    { title, content, group, imgSrc },
    function (err, post) {
      if (err) {
        result = makeResBody(400, {
          err,
        })
      } else {
        result = makeResBody(200, {
          post,
        })
      }
    }
  )

  return makeResBody(200, { post: get(result, "body.post", null) })
}

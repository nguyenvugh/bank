import { get } from "lodash"
import {
  createPost,
  getAllPost,
  deletePostById,
  updatePostById,
} from "../../../server/service/PostService"
import withValidateToken from "../../../utils/server/withValidateToken"

const handler = async (req, res) => {
  let statusCode, body
  const { postId } = get(req, "query", {})
  switch (req.method) {
    case "GET": {
      const allPost = await getAllPost()
      statusCode = allPost.statusCode
      body = allPost.body
      break
    }
    case "POST": {
      const newPost = await createPost(req.body)
      statusCode = newPost.statusCode
      body = newPost.body
      break
    }
    case "PUT": {
      const updatedPost = await updatePostById({ postId, ...req.body })
      statusCode = updatedPost.statusCode
      body = updatedPost.body
      break
    }
    case "DELETE": {
      const deletedPost = await deletePostById(postId)
      statusCode = deletedPost.statusCode
      body = deletedPost.body
      break
    }
    default: {
      statusCode = 404
      body = { message: "Not found url with method" }
      break
    }
  }
  res.status(statusCode).json({
    status: statusCode,
    ...body,
  })
}
export default withValidateToken(handler)

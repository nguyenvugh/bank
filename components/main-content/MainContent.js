import React from "react"
import styles from "./maincontent.module.scss"
import { extraData } from "../../constant/mockData"
import { Register } from "./../left-side-bar/Register"
import { ExtraContent } from "./ExtraContent"
import { useRouter } from "next/router"

export function MainContent({ posts }) {
  const router = useRouter()
  const { postId } = router.query
  const currentPost = posts.find((p) => p._id === postId)
  const content = currentPost ? currentPost.content : extraData
  return (
    <div className={styles.wrapper}>
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: content }}
      />

      <Register />

      <ExtraContent posts={posts} />
    </div>
  )
}

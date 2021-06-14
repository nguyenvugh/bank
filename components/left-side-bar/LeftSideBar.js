import React from "react"
import styles from "./leftSideBar.module.scss"
import { Register } from "./Register"
import { groupBy } from "lodash"
import Link from "next/link"

export function LeftSideBar(props) {
  const postByGroup = groupBy(props.post, "group")
  const highlightPost = postByGroup["HIGHLIGHTS-POST"] || []
  const extraPost = postByGroup["EXTRA-POST"] || []
  return (
    <div className={styles.wrapper}>
      <div className={styles.topPost}>
        <div className={styles.title}>Bài viết nổi bật</div>
        {highlightPost.map((data, index) => (
          <div className={styles.post} key={index}>
            <Link href={`/post/${data._id}`}>
              <a>{data.title}</a>
            </Link>
          </div>
        ))}
      </div>

      <div className={styles.supports}>
        <div className={styles.title}>Hỗ trợ</div>
        <Register />
        <div
          className={styles.extraContent}
          dangerouslySetInnerHTML={{
            __html: extraPost.length ? extraPost[0].content : "",
          }}
        />
      </div>
    </div>
  )
}

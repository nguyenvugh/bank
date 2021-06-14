import { groupBy } from "lodash"
import Link from "next/link"
import React from "react"
import styles from "./extraContent.module.scss"
// import { postData } from "../../constant/mockData"
// import { get } from "lodash"

const paragraphStyle = {
  height: "95px",
  overflow: "hidden",
  textAlign: "justify",
  wordSpacing: "1px",
}
export function ExtraContent({ posts }) {
  const data = posts.filter(
    (p) => !["HIGHLIGHTS-POST", "EXTRA-POST"].includes(p.group)
  )

  const postByGroup = groupBy(data, "group")
  return (
    <div className={styles.wrapper}>
      {Object.keys(postByGroup).map((group) => (
        <>
          <div className={styles.title}>
            <div>{group}</div>
          </div>
          <div className={styles.extraWrapper}>
            {postByGroup[group].map((it) => (
              <div className={styles.post} key={it._id}>
                <div>
                  <img src='https://picsum.photos/200/300' />
                </div>
                <Link href={`/post/${it._id}`}>
                  <h4>{it.title}</h4>
                </Link>
                <div
                  style={paragraphStyle}
                  dangerouslySetInnerHTML={{
                    __html: it.content,
                  }}
                />
              </div>
            ))}
          </div>
        </>
      ))}
    </div>
  )
}

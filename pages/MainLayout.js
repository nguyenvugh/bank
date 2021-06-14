import React from "react"
import { Footer } from "../components/footer/Footer"
import { Header } from "../components/header/Header"
import { LeftSideBar } from "../components/left-side-bar/LeftSideBar"
import styles from "./index.module.scss"
import { api_posts } from "../constans/api.constan"
import useSwr from "../custom-hook/useSwr"

export default function MainLayout(props) {
  const data = useSwr(api_posts)
  return (
    <>
      <Header />
      <div className={styles.main}>
        <div className={styles.left}>
          <LeftSideBar post={data.posts || []} />
        </div>
        <div className={styles.right}>{props.children}</div>
      </div>
      <Footer />
    </>
  )
}

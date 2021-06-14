import React from "react"
import { MainContent } from "../../components/main-content/MainContent"
import { api_posts } from "../../constans/api.constan"
import useSwr from "../../custom-hook/useSwr"
import MainLayout from "../MainLayout"

function Post() {
  const data = useSwr(api_posts)
  return (
    <MainLayout>
      <MainContent posts={data.posts || []} />
    </MainLayout>
  )
}

export default Post

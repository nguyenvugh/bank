import React from "react"
import { useRouter } from "next/router"
import MenuSetting from "./MenuSetting"
import GroupSetting from "./GroupSetting"
import PostSetting from "./PostSetting"
import AdminLayout from "./AdminLayout"

const Pages = {
  "menu-setting": MenuSetting,
  "group-setting": GroupSetting,
  "post-setting": PostSetting,
}
const Page = () => {
  const router = useRouter()
  const { page } = router.query
  const Component = Pages[page]

  return (
    <AdminLayout>
      {typeof Component === "function" ? <Component /> : null}
    </AdminLayout>
  )
}
export default Page

import React, { useEffect, useState } from "react"
import styles from "./header.module.scss"
import { api_get_all_menus } from "../../constans/api.constan"
import { flatToTree } from "../../utils/utils"
import { get } from "lodash"
import useSwr from "../../custom-hook/useSwr"
import Link from "next/link"

export function Header() {
  const [menus, setMenus] = useState([])
  const data = useSwr(api_get_all_menus)
  useEffect(() => {
    setMenus(get(data, "menus", []))
  }, [data])

  const renderTreeMenu = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <li>
            <Link href={`/post/${item.postId}`}>
              <a>{item.title}</a>
            </Link>
            <ul className={styles.subListItem}>
              {renderTreeMenu(item.children)}
            </ul>
          </li>
        )
      }
    })
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <img
          src='https://picsum.photos/200/300'
          alt=' author'
          width='100%'
          height={300}
        />
      </div>

      <ul className={styles.nav}>{renderTreeMenu(flatToTree(menus))}</ul>
    </div>
  )
}

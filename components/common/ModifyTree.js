import React from "react"
import { Tree } from "antd"
import styles from "./modifyTree.module.scss"
import { get } from "lodash"

function ModifyTree({ style, treeData = [], extraAction, ...props }) {
  function makeTitle(title, id) {
    return (
      <div className={styles.titleWrapper}>
        <div className={styles.title}>{title}</div>
        <div className={styles.action}>{extraAction({ id })}</div>
      </div>
    )
  }

  const updateTitleChildren = (childrenData = []) => {
    return childrenData.map((child) => {
      const { children } = child
      const newChild = {
        ...child,
        title: makeTitle(get(child, "title", ""), get(child, "_id", "")),
      }
      if (children) {
        newChild.children = updateTitleChildren(children)
      }

      return newChild
    })
  }
  return (
    <div className={styles.wrapper} style={style}>
      <Tree
        key={Math.random()}
        showLine={{ showLeafIcon: false }}
        treeData={updateTitleChildren(treeData)}
        selectable={false}
        defaultExpandAll
        {...props}
      />
    </div>
  )
}

export default ModifyTree

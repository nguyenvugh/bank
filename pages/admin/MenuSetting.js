import { Button, Card, Col, Input, Row, Radio, Space } from "antd"
import React, { useEffect, useState } from "react"
import ModifyTree from "../../components/common/ModifyTree"
import { api_get_all_menus } from "../../constans/api.constan"
import useSWR from "swr"
import { fetcher } from "../../utils/swr.utils"
import { find, get, remove } from "lodash"
import {
  DeleteOutlined,
  FolderAddOutlined,
  LinkOutlined,
} from "@ant-design/icons"
import { useDispatch, useSelector } from "react-redux"
import { createMenu, deleteMenu, updateMenu } from "../../redux/actions/menus"
import { error, success } from "../../utils/modalAlert"
import Modal from "antd/lib/modal/Modal"
import { flatToTree, genPath } from "../../utils/utils"
import AdminLayout from "./AdminLayout"
import { getPosts } from "../../redux/actions/postsReducers"
import replaceObjectById from "../../utils/object.utils"

const MenuSetting = () => {
  const { data } = useSWR(api_get_all_menus, fetcher, {
    initialData: {},
    refreshInterval: 500,
  })
  const dispatch = useDispatch()
  const [menus, setMenus] = useState([])
  const [newMenuTitle, setNewMenuTitle] = useState("")
  const [selectedMenuId, setSlectedMenuId] = useState(null)
  const [visibleModal, setVisibleModal] = useState(false)
  const [visibleModalLink, setVisibleModalLink] = useState(false)
  const [selectedPostId, setSelectedPostId] = useState(null)
  const { posts } = useSelector((state) => ({
    posts: state.postReducer.posts,
  }))
  useEffect(() => {
    setMenus(get(data, "menus", []))
  }, [data])

  async function handleCreateMenu() {
    if (!newMenuTitle) {
      error("Tên menu không được trống !")
      return
    }
    let payload = { title: newMenuTitle }
    if (selectedMenuId) {
      const selectedMenu = find(menus, ["_id", selectedMenuId])
      payload = {
        ...payload,
        parentId: get(selectedMenu, "_id", null),
        path: genPath(selectedMenu),
      }
    }
    const rs = await dispatch(createMenu(payload))
    if (get(rs, "payload.status", -1) === 201) {
      setMenus([...menus, get(rs, "payload.newMenu", {})])
      setNewMenuTitle("")
      setSlectedMenuId(null)
      setVisibleModal(false)
      success("Tạo menu thành công !")
    } else error("Có lỗi xảy ra")
  }

  async function handleDeleteMenu(menuId) {
    const rs = await dispatch(deleteMenu({ menuId }))
    if (get(rs, "payload.status", -1) === 200) {
      const updatedMenus = remove([...menus], function (it) {
        return it._id !== menuId
      })
      setMenus(updatedMenus)
      success("Xoá thành công !")
    } else error("Có lỗi xảy ra")
  }

  function handleLinkPost(menuId) {
    setSlectedMenuId(menuId)
    const selectedMenu = find(menus, ["_id", menuId])
    setSelectedPostId(selectedMenu.postId)
    dispatch(getPosts())
    setVisibleModalLink(true)
  }

  async function handleUpdateMenu() {
    const menu = find(menus, ["_id", selectedMenuId])
    const rs = await dispatch(
      updateMenu({ menuId: selectedMenuId, ...menu, postId: selectedPostId })
    )
    if (get(rs, "payload.status", -1) === 200) {
      const updatedMenus = replaceObjectById(menus, {
        ...menu,
        postId: selectedPostId,
      })
      setMenus(updatedMenus)
      success("Cập nhật thành công !")
    } else error("Có lỗi xảy ra")
  }

  const extraAction = ({ id }) => {
    return (
      <>
        <Button
          type='ghost'
          icon={<LinkOutlined />}
          style={{ marginRight: "10px" }}
          onClick={() => handleLinkPost(id)}
        />
        <Button
          style={{ marginRight: "10px" }}
          type='ghost'
          icon={<FolderAddOutlined style={{ color: "#1890ff" }} />}
          onClick={() => {
            setSlectedMenuId(id)
            setVisibleModal(true)
          }}
        />
        <Button
          type='ghost'
          icon={
            <DeleteOutlined
              style={{ color: "red" }}
              onClick={() => {
                handleDeleteMenu(id)
              }}
            />
          }
        />
      </>
    )
  }
  console.log(posts)
  return (
    <Card title='Thiết lập menu bar'>
      <Row gutter={[16, 16]}>
        <Col>
          <Button type='primary' onClick={handleCreateMenu}>
            Thêm mới
          </Button>
        </Col>
        <Col>
          <Input
            style={{ width: "500px" }}
            value={newMenuTitle}
            onChange={(e) => setNewMenuTitle(e.target.value)}
          />
        </Col>
      </Row>
      <ModifyTree
        extraAction={extraAction}
        style={{ width: "700px" }}
        treeData={flatToTree(menus)}
      />
      <Modal
        visible={visibleModal}
        title='Thêm menu con'
        okText='Thêm'
        cancelText='Huỷ'
        onCancel={() => {
          setSlectedMenuId(null)
          setVisibleModal(false)
          setNewMenuTitle("")
        }}
        onOk={handleCreateMenu}>
        <Input
          placeholder='Nhập tên menu con'
          onChange={(e) => setNewMenuTitle(e.target.value)}
          value={newMenuTitle}
        />
      </Modal>
      <Modal
        visible={visibleModalLink}
        title='Liên kết bài viết'
        okText='Liên kết'
        cancelText='Huỷ'
        onCancel={() => {
          setSlectedMenuId(null)
          setSelectedPostId(null)
          setVisibleModalLink(false)
        }}
        onOk={handleUpdateMenu}>
        <Radio.Group
          onChange={(e) => setSelectedPostId(e.target.value)}
          value={selectedPostId}>
          <Space direction='vertical'>
            {posts.map((it) => (
              <Radio key={it._id} value={it._id}>
                {it.title}
              </Radio>
            ))}
          </Space>
        </Radio.Group>
      </Modal>
    </Card>
  )
}
MenuSetting.Layout = AdminLayout
export default MenuSetting

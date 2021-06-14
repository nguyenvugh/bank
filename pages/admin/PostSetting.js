import {
  DeleteOutlined,
  EditOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons"
import { Button, Card, Divider, Input, Select, Space, Table } from "antd"
import { get } from "lodash"
import React, { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  getPosts,
  createPost,
  deletePost,
  updatePost,
} from "../../redux/actions/postsReducers"
import { error, success } from "../../utils/modalAlert"
import styles from "./post.module.scss"
import Editor from "../../components/common/Editor"
import { getGroups } from "../../redux/actions/groups"
import AdminLayout from "./AdminLayout"

const { Option } = Select

const PostSetting = () => {
  const [selectedPostId, setSelectedPostId] = useState(null)
  const [defaultPost, setDefaultPost] = useState({})
  const [editContent, setEditContent] = useState("")
  const dispatch = useDispatch()
  const { posts, groups, createLoading } = useSelector((state) => ({
    posts: state.postReducer.posts,
    groups: state.groupReducer.groups,
    createLoading: state.postReducer.createLoading,
  }))

  useEffect(() => {
    dispatch(getPosts())
    dispatch(getGroups())
  }, [])
  useEffect(() => {
    const selectedPost = posts.find((e) => e._id === selectedPostId) || {}
    setDefaultPost(selectedPost)
  }, [selectedPostId])

  async function handleCreatePost() {
    if (!defaultPost.title) {
      error("Tên bài viết không được trống !")
      return
    }
    const rs = await dispatch(
      createPost({ ...defaultPost, content: editContent })
    )
    if (get(rs, "payload.status", -1) === 201) {
      setDefaultPost({})
      success("Tạo bài viết thành công !")
    } else error("Có lỗi xảy ra")
  }

  async function handleDeletePost(id) {
    const rs = await dispatch(deletePost({ postId: id }))
    if (get(rs, "payload.status", -1) === 200) {
      success("Xoá thành công !")
    } else error("Có lỗi xảy ra")
  }

  async function handleEditPost() {
    if (!defaultPost.title) {
      error("Tên bài viết không được trống !")
      return
    }
    const rs = await dispatch(
      updatePost({
        ...defaultPost,
        content: editContent,
        postId: selectedPostId,
      })
    )
    if (get(rs, "payload.status", -1) === 200) {
      success("Cập nhật thành công !")
    } else error("Có lỗi xảy ra")
  }

  function handleChangePost(value, path) {
    setDefaultPost({
      ...defaultPost,
      [path]: value,
    })
  }

  const columns = [
    {
      title: "Tên",
      dataIndex: "title",
      className: styles.titleCol,
      // eslint-disable-next-line react/display-name
      render: (text) => <a>{text}</a>,
    },
    {
      title: "",
      width: 100,
      dataIndex: "_id",
      // eslint-disable-next-line react/display-name
      render: (id) => (
        <>
          <DeleteOutlined
            onClick={() => handleDeletePost(id)}
            style={{ color: "red", cursor: "pointer" }}
          />
          <Divider type='vertical' />
          <EditOutlined
            onClick={() => {
              setSelectedPostId(id)
            }}
            style={{ cursor: "pointer" }}
          />
        </>
      ),
    },
  ]
  const { _id, title, group, content } = defaultPost
  return (
    <Card
      style={{ minHeight: "100vh" }}
      title='Tạo bài viết'
      extra={
        selectedPostId ? (
          <Space>
            <Button disabled={createLoading} onClick={handleEditPost}>
              Sửa
            </Button>
            <Button
              icon={<CloseCircleOutlined />}
              onClick={() => {
                setSelectedPostId(null)
                setDefaultPost({})
              }}
            />
          </Space>
        ) : (
          <Button disabled={createLoading} onClick={handleCreatePost}>
            Thêm
          </Button>
        )
      }>
      <Space style={{ width: "100%" }} align='start end'>
        <Table
          columns={columns}
          dataSource={posts}
          bordered
          title={() => "Danh sách bài biết"}
          pagination={false}
          extraAction={"sad"}
        />
        <Space direction='vertical' style={{ width: "100%" }}>
          <Space>
            <h3>Nhóm bài viết:</h3>
            <Select
              key={_id}
              defaultValue={group}
              onChange={(value) => handleChangePost(value, "group")}
              style={{ width: "200px" }}>
              {groups.map((it) => (
                <Option key={it._id} value={it.title}>
                  {it.title}
                </Option>
              ))}
            </Select>
          </Space>
          <Space>
            <h3>Tiêu đề:</h3>
            <Input
              onChange={(e) => handleChangePost(e.target.value, "title")}
              key={_id}
              defaultValue={title}
            />
          </Space>
          <Space direction='vertical'>
            <h3>Nội dung:</h3>
            {useMemo(
              () => (
                <Editor
                  onChange={(value) => setEditContent(value)}
                  key={_id}
                  defaultValue={content}
                />
              ),
              [_id, content]
            )}
          </Space>
        </Space>
      </Space>
      {/* <Modal
        visible={visibleModal}
        title='Sửa nhóm bài viết'
        okText='Sửa'
        cancelText='Huỷ'
        onCancel={() => {
          setSelectedGroupId(null)
          setVisibleModal(false)
          setNewTitle("")
        }}
        onOk={handleEditGroup}>
        <Input
          placeholder='Nhập tiêu đề'
          onChange={(e) => setNewTitle(e.target.value)}
          value={newTitle}
        />
      </Modal> */}
    </Card>
  )
}
PostSetting.Layout = AdminLayout
export default PostSetting

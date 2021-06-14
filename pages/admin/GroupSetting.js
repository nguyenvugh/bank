import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { Button, Card, Divider, Input, Space, Table } from "antd"
import Modal from "antd/lib/modal/Modal"
import { get } from "lodash"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  getGroups,
  createGroup,
  deleteGroup,
  updateGroup,
} from "../../redux/actions/groups"
import { error, success } from "../../utils/modalAlert"
import AdminLayout from "./AdminLayout"

const GroupSetting = () => {
  const [newTitle, setNewTitle] = useState("")
  const [selectedGroupId, setSelectedGroupId] = useState(null)
  const [visibleModal, setVisibleModal] = useState(false)
  const dispatch = useDispatch()
  const { groups, createLoading } = useSelector((state) => ({
    groups: state.groupReducer.groups,
    createLoading: state.groupReducer.createLoading,
  }))

  useEffect(() => {
    dispatch(getGroups())
  }, [])
  async function handleCreateGroup() {
    if (!newTitle) {
      error("Tên nhóm không được trống !")
      return
    }
    const rs = await dispatch(createGroup({ title: newTitle }))
    if (get(rs, "payload.status", -1) === 201) {
      setNewTitle("")
      success("Tạo nhóm thành công !")
    } else error("Có lỗi xảy ra")
  }

  async function handleDeleteGroup(id) {
    const rs = await dispatch(deleteGroup({ groupId: id }))
    if (get(rs, "payload.status", -1) === 200) {
      success("Xoá thành công !")
    } else error("Có lỗi xảy ra")
  }

  async function handleEditGroup() {
    console.log(selectedGroupId, newTitle)
    const rs = await dispatch(
      updateGroup({ groupId: selectedGroupId, title: newTitle })
    )
    if (get(rs, "payload.status", -1) === 200) {
      setVisibleModal(false)
      setNewTitle("")
      success("Cập nhật thành công !")
    } else error("Có lỗi xảy ra")
  }

  const columns = [
    {
      title: "Tên",
      dataIndex: "title",
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
            onClick={() => handleDeleteGroup(id)}
            style={{ color: "red", cursor: "pointer" }}
          />
          <Divider type='vertical' />
          <EditOutlined
            onClick={() => {
              setSelectedGroupId(id)
              setVisibleModal(true)
            }}
            style={{ cursor: "pointer" }}
          />
        </>
      ),
    },
  ]
  return (
    <Card title='Thiết nhóm bài viết'>
      <Space style={{ marginBottom: 16 }}>
        <Button disabled={createLoading} onClick={handleCreateGroup}>
          Thêm
        </Button>
        <Input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
      </Space>
      <Table
        columns={columns}
        dataSource={groups}
        bordered
        title={() => "Danh sách nhóm bài biết"}
        pagination={false}
        extraAction={"sad"}
      />
      <Modal
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
      </Modal>
    </Card>
  )
}

GroupSetting.Layout = AdminLayout
export default GroupSetting

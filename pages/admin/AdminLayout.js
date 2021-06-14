import React, { useState } from "react"
import { Breadcrumb, Layout, Menu } from "antd"
import {
  BarChartOutlined,
  UserOutlined,
  UploadOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons"
import Link from "next/link"

const { Header, Content, Footer, Sider } = Layout
const { Item } = Menu

const AdminLayout = (props) => {
  const [currentPage, setCurrentPage] = useState("Menu Setting")
  const renderBreadcrumb = (
    <Breadcrumb>
      <Breadcrumb.Item>Quản trị</Breadcrumb.Item>
      <Breadcrumb.Item>{currentPage}</Breadcrumb.Item>
    </Breadcrumb>
  )
  return (
    <Layout>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
        }}>
        <div className='logo' style={{ color: "#fff" }}>
          asdasd
        </div>
        <Menu theme='dark' mode='inline' defaultSelectedKeys={["1"]}>
          <Item
            key='1'
            icon={<UserOutlined />}
            onClick={() => setCurrentPage("Menu")}>
            <Link href='/admin/menu-setting'>
              <a>Menu</a>
            </Link>
          </Item>
          <Item
            key='2'
            icon={<VideoCameraOutlined />}
            onClick={() => setCurrentPage("Nhóm bài viết")}>
            <Link href='/admin/group-setting'>
              <a>Nhóm bài viết</a>
            </Link>
          </Item>
          <Item
            key='3'
            icon={<UploadOutlined />}
            onClick={() => setCurrentPage("Bài viết")}>
            <Link href='/admin/post-setting'>
              <a>Bài biết</a>
            </Link>
          </Item>
          <Item
            key='4'
            icon={<BarChartOutlined />}
            onClick={() => setCurrentPage("Footer")}>
            <Link href='/admin/FooterSetting'>
              <a>Footer</a>
            </Link>
          </Item>
        </Menu>
      </Sider>
      <Layout className='site-layout' style={{ marginLeft: 200 }}>
        <Header className='site-layout-background' style={{ padding: 0 }} />
        <Content
          style={{
            margin: "24px 16px 0",
            overflow: "initial",
            minHeight: "100vh",
          }}>
          {renderBreadcrumb}
          <div className='site-layout-background' style={{ padding: 24 }}>
            {props.children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Vayvon ©2021 developed by vunv
        </Footer>
      </Layout>
    </Layout>
  )
}

export default AdminLayout

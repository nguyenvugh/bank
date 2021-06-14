import React from "react"
import { Form, Input, Button, Card } from "antd"
import { get } from "lodash"
import { useRouter } from "next/router"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { loginAction } from "../../redux/actions/login"
import { error } from "../../utils/modalAlert"

const Login = () => {
  const [isRegister, setIsRegister] = useState(false)
  const router = useRouter()
  const dispatch = useDispatch()

  const onFinish = async (props) => {
    const { username, password } = props
    const rs = await dispatch(loginAction({ username, password }))
    if (get(rs, "payload.status", -1) === 200) {
      router.push("/admin/menu-setting")
    } else error("Sai tên đăng nhập hoặc mật khẩu !")
  }

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo)
  }

  return (
    <Card
      title={isRegister ? "Đăng ký" : "Đăng nhập"}
      extra={
        <div
          onClick={() => setIsRegister(!isRegister)}
          style={{
            color: "#1790ff",
            cursor: "pointer",
            userSelect: "none",
          }}>
          {isRegister ? "Đăng nhập" : "Đăng ký"}
        </div>
      }
      style={{
        width: "500px",
        margin: "auto",
        top: "calc(50vh - 250px)",
      }}>
      <Form
        {...layout}
        name='basic'
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}>
        <Form.Item
          label='Tên đăng nhập'
          name='username'
          rules={[
            {
              required: true,
              message: "Tên đăng nhập là bắt buộc !",
            },
          ]}>
          <Input />
        </Form.Item>

        <Form.Item
          label='Mật khẩu'
          name='password'
          rules={[
            {
              required: true,
              message: "Mật khẩu là bắt buộc !",
            },
          ]}>
          <Input.Password />
        </Form.Item>

        {isRegister && (
          <Form.Item
            label='Xác nhận mật khẩu'
            name='confirmPassword'
            rules={[
              {
                required: true,
                message: "Bạn cần xác nhận mật khẩu !",
              },
            ]}>
            <Input.Password />
          </Form.Item>
        )}

        <Form.Item {...tailLayout}>
          <Button type='primary' htmlType='submit'>
            {isRegister ? "Đăng ký" : "Đăng nhập"}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
}
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
}

export default Login

import React from "react"
import { Modal } from "antd"
import styles from "./modalAlert.less"

export function success(message) {
  Modal.success({
    className: styles.modal,
    content: <div style={{ fontSize: "large" }}>{message}</div>,
  })
}

export function error(message) {
  Modal.error({
    className: styles.modal,
    content: <div style={{ fontSize: "large" }}>{message}</div>,
  })
}

export function warning(message) {
  Modal.warning({
    className: styles.modal,
    content: <div style={{ fontSize: "large" }}>{message}</div>,
  })
}

export function confirm({
  title,
  okText,
  cancelText,
  content,
  onOk,
  okButtonProps,
  cancelButtonProps,
}) {
  Modal.confirm({
    title,
    okText,
    cancelText,
    className: styles.modal,
    okButtonProps,
    cancelButtonProps,
    content: <div style={{ fontSize: "large" }}>{content}</div>,
    onOk,
  })
}

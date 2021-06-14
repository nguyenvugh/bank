import React, { useState } from "react"
import styles from "./register.module.scss"

export function Register() {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [loanType, setLoanType] = useState("")
  const [contentSupport, seContentSupport] = useState("")
  const [validate, setValidate] = useState(false)

  console.log(loanType, contentSupport)
  function handleRegister() {
    setValidate(true)
  }
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}> Đăng ký tư vấn</h2>

      <div className={styles.field}>
        <p>Họ tên *</p>
        <input type='text' onChange={(e) => setName(e.target.value)} />
        {validate && !name && <span>Họ tên được yêu cầu</span>}
      </div>

      <div className={styles.field}>
        <p>Điện thoại *</p>
        <input type='text' onChange={(e) => setPhone(e.target.value)} />
        {validate && !phone && <span>Điện thoại được yêu cầu</span>}
      </div>

      <div className={styles.field}>
        <p>Bạn muốn vay theo *</p>
        <select onBlur={(e) => setLoanType(e.target.value)}>
          <option value='Vay theo lương chuyển khoản'>
            Vay theo lương chuyển khoản
          </option>
          <option value='Vay theo tiêng mặt'>Vay theo tiền mặt</option>
          <option value='Vay theo bảo hiểm'>Vay theo bảo hiểm</option>
          <option value='khác'>Khác</option>
        </select>
      </div>

      <div className={styles.field}>
        <p>Nội dung cần tư vấn *</p>
        <input type='text' onChange={(e) => seContentSupport(e.target.value)} />
      </div>

      <div className={styles.button} onClick={() => handleRegister}>
        gửi đi
      </div>
    </div>
  )
}

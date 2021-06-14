import React from "react"
import styles from "./footer.module.scss"

export function Footer() {
  return (
    <div className={styles.wrapper}>
      <div
        className={styles.left}
        dangerouslySetInnerHTML={{
          __html: `
          <p>TƯ VẤN VÀ HỖ TRỢ THỦ TỤC VAY TÍN CHẤP NGÂN HÀNG VIETINBANK</p>
          <p>Hotline : 0853568222</p>
          <p>Email : anlv.hn@gmail.com</p>
        `,
        }}
      />
      <div
        className={styles.left}
        dangerouslySetInnerHTML={{
          __html: `
        GỢI Ý NHANH
        TRANG CHỦ || VAY TÍN CHẤP VIETINBANK || THỦ TỤC HỒ SƠ VAY NGÂN HÀNG VIETINBANK || ƯU ĐÃI VAY TIỀN NGÂN HÀNG VIETINBANK || CHÍNH SÁCH BẢO MẬT THÔNG TIN ||
        `,
        }}
      />
    </div>
  )
}

import React from "react"
import { makeStore, wrapper } from "../redux/actions/store"
import { Provider } from "react-redux"
require("../styles/global.less")

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={makeStore()}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default wrapper.withRedux(MyApp)

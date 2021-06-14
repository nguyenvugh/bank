import { configureStore } from "@reduxjs/toolkit"
import counterReducer from "./counter"
import loginReducer from "./login"
import menuReducer from "./menus"
import groupReducer from "./groups"
import postReducer from "./postsReducers"
import { createWrapper } from "next-redux-wrapper"

export const makeStore = () => {
  const store = configureStore({
    reducer: {
      counterReducer,
      loginReducer,
      menuReducer,
      groupReducer,
      postReducer,
    },
  })

  return store
}

export const wrapper = createWrapper(makeStore, { debug: true })

import { configureStore } from '@reduxjs/toolkit'
import pasteReducer from './redux/pasteSlice'
import { useDispatch } from "react-redux";


export const store = configureStore({
  reducer: {
    paste: pasteReducer,
  },
})
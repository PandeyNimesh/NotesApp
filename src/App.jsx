// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { RouterProvider } from 'react-router-dom'
import Home from './component/Home'
import Paste from './component/Paste'
import ViewPaste from './component/ViewPaste'
import Navbar from './component/Navbar'
import { createBrowserRouter } from 'react-router-dom'
import './App.css'

const router = createBrowserRouter([
  {
    path: "/",
    element:
      <div>
        <Navbar />
        <Home />
      </div>
  },
  {
    path: "pastes/",
    element:
      <div>
        <Navbar />
        <Paste />
      </div>
  },
  {
    path: "/pastes/:id",
    element:
      <div>
        <Navbar />
        <ViewPaste />
      </div>
  },

])
function App() {


  return (
    <>
      <RouterProvider router={router}>
        <Navbar />
        <Home />
        <Paste />
        <ViewPaste />
      </RouterProvider>
    </>
  )
}

export default App

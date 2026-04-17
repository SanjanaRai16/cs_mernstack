import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import CreatePost from './pages/CreatePost'
import AllPosts from './pages/AllPosts'
import MyPosts from './pages/Myposts'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/' element={<Login />} />
          <Route path='/create-post' element={<CreatePost />} />
          <Route path='/allposts' element={<AllPosts />} />
          <Route path='/myposts' element={<MyPosts />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

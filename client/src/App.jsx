import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Blog from './pages/Blog'
import Layout from './pages/admin/Layout'
import Dashboard from './pages/admin/Dashboard'
import AddBlog from './pages/admin/AddBlog'
import ListBlog from './pages/admin/ListBlog'
import Comments from './pages/admin/Comments'
import EditBlog from './pages/admin/EditBlog' 
import Login from './components/admin/Login'
import Register from './components/admin/Register'
import ProfileLayout from './pages/ProfileLayout'
import LikedBlogs from './pages/LikedBlogs'
import MyComments from './pages/MyComments'
import 'quill/dist/quill.snow.css'
import { Toaster } from 'react-hot-toast'
import { useAppContext } from './context/AppContext'

const App = () => {
  const { token } = useAppContext()

  return (
    <div>
      <Toaster />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/blog/:id' element={<Blog />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/admin' element={token ? <Layout /> : <Login />}>
          <Route index element={<Dashboard />} />
          <Route path='addBlog' element={<AddBlog />} />
          <Route path='listBlog' element={<ListBlog />} />
          <Route path='comments' element={<Comments />} />
          <Route path='edit-blog/:blogId' element={<EditBlog />} />
        </Route>
        <Route path='/profile' element={<ProfileLayout />}>
          <Route path='liked' element={<LikedBlogs />} />
          <Route path='comments' element={<MyComments />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
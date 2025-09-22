import React, {useState} from 'react'
import { blogCategories } from '../assets/assets'
import { motion } from "motion/react"
import BlogCard from './BlogCard'
import { useAppContext } from '../context/AppContext'

const BlogList = ({ blogs, onBlogClick }) => {

  const [menu, setMenu] = useState("All")
  const { input } = useAppContext();

  const filteredBlogs = () => {
    if(!input || input === ''){
      return blogs
    }
    return blogs.filter((blog) => blog.title.toLowerCase().includes(input.toLowerCase()) || blog.category.toLowerCase().includes(input.toLowerCase()))
  }

  return (
    <div className="mt-10">
      <div className="flex flex-wrap justify-center gap-2 sm:gap-6 my-10 relative px-4">
        {blogCategories.map((item, index)=>(
            <div key={index} className="relative">
                <button onClick={() => setMenu(item)}
                  className={`relative cursor-pointer text-sm text-gray-500 ${ menu === item ? "text-white px-4 py-1" : "px-2 py-1" }`}>
                    {item}
                    {menu === item && ( <motion.div 
                    layoutId='underline'
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    className="absolute left-0 right-0 top-0 h-full -z-10 bg-primary rounded-full"></motion.div> )}
                </button>
            </div>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-24 mx-4 sm:mx-8 md:mx-16 xl:mx-24">
        {filteredBlogs().filter((blog) => menu === "All" ? true : blog.category === menu).map((blog) => <BlogCard key={blog._id} blog={blog} onClick={() => onBlogClick(blog._id)} />)}
      </div>
    </div>
  )
}

export default BlogList
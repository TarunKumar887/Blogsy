import React, { useEffect, useRef, useState } from 'react'
import { assets, blogCategories } from '../../assets/assets'
import Quill from 'quill';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import { useParams, useNavigate } from 'react-router-dom';

const EditBlog = () => {
    const { blogId } = useParams();
    const navigate = useNavigate();
    const { axios } = useAppContext();

    const [isUpdating, setIsUpdating] = useState(false);
    const [image, setImage] = useState(null);
    const [title, setTitle] = useState('');
    const [subTitle, setSubTitle] = useState('');
    const [category, setCategory] = useState('Startup');
    const [isPublished, setIsPublished] = useState(false);

    const editorRef = useRef(null);
    const quillRef = useRef(null);

 
    useEffect(() => {
        const fetchBlogData = async () => {
            try {
                const { data } = await axios.get(`/api/blog/${blogId}`);
                if (data.success) {
                    const blog = data.blog;
                    setTitle(blog.title);
                    setSubTitle(blog.subTitle || '');
                    setCategory(blog.category);
                    setIsPublished(blog.isPublished);
                    setImage(blog.image);
                    if (quillRef.current) {
                        quillRef.current.root.innerHTML = blog.description;
                    }
                } else {
                    toast.error("Failed to fetch blog data.");
                    navigate("/admin/listBlog");
                }
            } catch (error) {
                toast.error("Error fetching blog data.");
                navigate("/admin/listBlog");
            }
        };

        if (!quillRef.current && editorRef.current) {
            quillRef.current = new Quill(editorRef.current, { theme: 'snow' });
        }
        fetchBlogData();
    }, [blogId, axios, navigate]);


    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setIsUpdating(true);
        try {
            const blogData = {
                title, subTitle,
                description: quillRef.current.root.innerHTML,
                category, isPublished
            };

            const formData = new FormData();
            formData.append('blog', JSON.stringify(blogData));
            
            if (image && image instanceof File) {
                formData.append('image', image);
            }

            const token = localStorage.getItem('token');
            
            const { data } = await axios.put(`/api/blog/edit/${blogId}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (data.success) {
                toast.success("Blog updated successfully!");
                navigate("/admin/listBlog");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsUpdating(false);
        }
    };

    
    const imagePreviewSrc = image instanceof File ? URL.createObjectURL(image) : image;

    return (
        <form onSubmit={onSubmitHandler} className="flex-1 bg-blue-50/50 text-gray-600 h-full overflow-y-auto">
            <div className="bg-white w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow rounded">
                <p className="font-semibold">Update Blog</p>

                <p className="mt-4">Upload Thumbnail</p>
                <label htmlFor="image">
                    <img src={image ? imagePreviewSrc : assets.upload_area} alt="thumbnail" className="h-32 w-auto object-contain rounded cursor-pointer mt-2" />
                </label>
                <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden />

                <p className='mt-4'>Blog Title</p>
                <input type="text" placeholder='Type here' required className="w-full max-w-lg mt-2 border border-gray-300 outline-none rounded px-3 py-2" onChange={e => setTitle(e.target.value)} value={title} />

                <p className='mt-4'>Sub Title</p>
                <input type="text" placeholder='Type here' className="w-full max-w-lg mt-2 border border-gray-300 outline-none rounded px-3 py-2" onChange={e => setSubTitle(e.target.value)} value={subTitle} />

                <p className='mt-4'>Blog Description</p>
                <div className="max-w-lg h-72 pb-10 pt-2 relative border border-gray-300 rounded">
                    <div ref={editorRef}></div>
                </div>

                <p className="mt-4">Blog category</p>
                <select name="category" onChange={(e) => setCategory(e.target.value)} className="mt-2 px-3 py-2 border text-gray-500 border-gray-300 outline-none rounded" value={category}>
                    {blogCategories.map((item, index) => (
                        <option key={index} value={item}>
                            {item}
                        </option>
                    ))}
                </select>

                <div className="flex items-center gap-3 mt-4">
                    <p>Publish Now</p>
                    <input name="isPublished" type="checkbox" checked={isPublished} className="scale-125 cursor-pointer" onChange={(e) => setIsPublished(e.target.checked)} />
                </div>

                <button disabled={isUpdating} type="submit" className="mt-8 w-40 h-10 bg-primary text-white rounded cursor-pointer text-sm flex items-center justify-center">
                    {isUpdating ? 'Updating...' : 'Update Blog'}
                </button>
            </div>
        </form>
    );
};

export default EditBlog;
import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreatePost = () => {
  return (
    <div className='flex flex-col gap-4 md:gap-8'>
        <form>    
            <p>Title</p>
            <input className='border-gray-200 border-2 p-2 rounded-sm w-[85%] sm:w-[75%] mb-4' type='text' placeholder='Title' name='title' />
            <p>Summary</p>
            <input className='border-gray-200 border-2 p-2 rounded-sm w-[85%] sm:w-[75%] mb-4' type='summary' name='summary' />
            <p>File</p>
            <input className='border-gray-200 border-2 p-2 rounded-sm w-[85%] sm:w-[75%] mb-4' type='file' name='summary' />
        </form>
        <ReactQuill/>
    </div>
  )
}

export default CreatePost
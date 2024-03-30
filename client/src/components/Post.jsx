import React from 'react'
import {Link} from 'react-router-dom';
import {format,formatISO9075} from 'date-fns';


const Post = ({title,summary,image,author,createdAt,_id}) => {
    const imagePath = `http://localhost:3000/${image}`;
  return (
    <div className='grid grid-cols-2  md:grid-cols-3 gap-4 h-[120px] sm:h-[150px] lg:h-[200px] font-poppins text-[#333]'>
        <Link to={`/posts/${_id}`} className='h-[100%] m-auto'>
            <img className='object-contain max-h-[150px] md:max-h-[200px]' src={imagePath}/>
        </Link>
        <div className='flex flex-col gap-0.5 lg:gap-2 md:col-span-2 h-[100%]  overflow-hidden'>
            <Link to={`/posts/${_id}`} className='font-bold text-xl sm:text-2xl lg:text-3xl 2xl:text-4xl line-clamp-2'>{title}</Link>
            <div className='flex gap-2 font-semibold text-[10px] sm:text-[14px] max-[450px]:hidden' >
                <p>{author.username}</p>
                <time className='text-[#a6a3a3]'> {formatISO9075(new Date(createdAt))}</time>
            </div>
            <p className='text-[14px] md:text-[1rem] max-[450px]:hidden line-clamp-3 min-[1200px]:line-clamp-5 min-[800px]:line-clamp-4'>
                {summary}
            </p>
        </div>
    </div>
  )
}

export default Post
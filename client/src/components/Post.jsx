import React from 'react'

const Post = () => {
  return (
    <div className='grid grid-cols-2  md:grid-cols-3 gap-4 h-[120px] sm:h-[150px] lg:h-[200px] font-poppins text-[#333]'>
        <div className='h-[100%] m-auto'>
            <img className='object-contain max-h-[150px] md:max-h-[200px]' src='https://placehold.co/600x400/EEE/31343C'/>
        </div>
        <div className='flex flex-col gap-0.5 lg:gap-2 md:col-span-2 h-[100%]  overflow-hidden'>
            <h2 className='font-bold text-xl sm:text-2xl lg:text-3xl 2xl:text-4xl'>Blog Header: This is the blog header</h2>
            <div className='flex gap-2 font-semibold text-[10px] sm:text-[14px] max-[450px]:hidden' >
                <p>Author name </p>
                <time className='text-[#a6a3a3]'> 2023-04-21 16:45</time>
            </div>
            <p className='text-[14px] md:text-[1rem] max-[450px]:hidden '>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus ullam esse deserunt repudiandae veritatis porro similique quod ut eius, architecto nobis illum, odit atque magnam quae, earum necessitatibus corporis fugit voluptas in ea! Fugit distinctio repellendus laudantium veniam placeat ea alias vitae nisi ab voluptatum minima officia ullam dolores, consequatur ratione a minus atque dolorum eos quas nulla. Obcaecati, cumque!
            </p>
        </div>
    </div>
  )
}

export default Post
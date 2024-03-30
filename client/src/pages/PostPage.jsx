import React, { useContext } from 'react'
import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { formatISO9075 } from 'date-fns';
import {Link} from 'react-router-dom'
import { UserContext } from '../context/userContext';

const PostPage = () => {

const [post,setPost] = useState();

const {userinfo} = useContext(UserContext);


const params = useParams();

useEffect(()=>{
fetchPost();
},[]);

const fetchPost = async ()=>{
    try{
        let response = await fetch(`http://localhost:3000/posts/${params.id}`);
        response = await response.json(); 
        setPost(response);     
    }catch(e){
        console.log(e.message);
    }
}

if(!post){
  return <div>Nothing yet</div>
}
const imagePath = `http://localhost:3000/${post.image}`;


  return (
    <div className='font-poppins'>
      <h1 className='font-bold text-xl sm:text-2xl lg:text-4xl 2xl:text-4xl text-center'>{post.title}</h1>
      <h2 className='font-semibold lg:text-xl text-center mt-4'>by {post.author.username}
      </h2>
      <h4 className='text-xl  text-gray-400 text-center text-[.75rem]'>{formatISO9075(new Date(post.createdAt) )}</h4>
     {(post.author.username === userinfo?.username) && <Link to={`/edit/${post._id}`} className='font-semibold text-[12px] lg:text-xl bg-[#333] text-white rounded-md w-[25%] sm:w-[20%] lg:w-[17.5%] mx-auto flex justify-center p-2 mt-4'>Edit Post</Link>}
      <img className='m-auto mt-8 rounded-lg w-[100%] aspect-[21/9] object-contain' src={imagePath} />
      <div className='sm:text-xl mt-10 mb-20 sm:[line-height:2.25rem]'
       dangerouslySetInnerHTML={{__html:post.content}} />
    </div>
  )
};

export default PostPage
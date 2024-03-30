import React, { useState,useEffect, useContext } from 'react'
import Post from '../components/Post'
import { AuthContext } from '../auth/Auth';




const IndexPage = () => {
  const [posts,setPosts] = useState([]);
  const{user} = useContext(AuthContext);
  
useEffect(()=>{
  fetchPosts();
},[]);

const fetchPosts = async() =>{
  try{
    let posts = await fetch("http://localhost:3000/post");
    posts = await posts.json();
    setPosts(posts);
  }
  catch(e){
    console.log(e);
  }
};


  return (
    <>
    {
     posts.map((post) => <Post key={post.createdAt} {...post} />)
    }                                 
    
    </>
  )
}

export default IndexPage
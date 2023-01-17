import React from 'react';
import { useSelector } from 'react-redux';

import './Posts.css';
import Post from './Post/Post';

function Posts({ setCurrentId }) {

  const { posts, isLoading } = useSelector((state) => state.posts);
  
    
  //if (!posts.length && !isLoading) return 'No posts';  // Once loading is done, if there are no posts, then display no posts on the screen

  return (
    <div className='postsContainer'>

      {
        isLoading?
          ( <div className="loading-spinner"/> ) 
          : 
          ( posts.length==0?
            ( 'No posts' ) 
            : 
            posts.map((post) => (
              <Post post={post} setCurrentId={setCurrentId}/>
            )) 
          )      
      }      
        
        
        
    </div>
  )
}

export default Posts;
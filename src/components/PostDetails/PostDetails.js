import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getPost, getPostsBySearch } from '../../actions/posts';

import './PostDetails.css';

function PostDetails() {

  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [comments, setComments] = useState(post?.comments);

    
  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);
  
  useEffect(() => {
    if (post) {
      setComments(post?.comments);
      dispatch(getPostsBySearch({ search: 'none', searchTags: post?.tags.join(',') }));
    }
  }, [post]);
  
  if (!post) return null;
  
  const openPost = (_id) => navigate(`/posts/${_id}`);
  
  if (isLoading) {
    return (
        <div className="loading-spinner"/>
    );
  }
  
  const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);

  return (
    <div className='postDetailsContainer'>
        <div className='postDetailsCommentsImageContainer'>
            <div className='postDetailsDescriptionSection'>
                <div className='postDetailsTitle'>
                    {post.title}
                </div>
                <div className='postDetailsTags'>
                    {post.tags.map((tag) => `#${tag} `)}
                </div>
                <div className='postDetailsMessage'>
                    {post.message}
                </div>
                <div className='postDetailsCreatorDetails'>
                    <span className='postDetailsCreatedBy'>{'Created by : '}</span>
                    <span className='postDetailsCreatorName'>{post.name} </span>
                </div>
                <div className='postDetailsCreatedAt'>
                    {moment(post.createdAt).fromNow()}
                </div>
                <hr className='pageDivider'/>
                <div className='PostDetailsCommentsSection'>
                    <div className='postDetailsCommentsExisting'>
                        <div className='postDetailsCommentsExistingTitle'>Comments</div>
                        <div className='postDetailsCommentsExistingComments'>
                            {comments?.map((c, i) => (
                                <div className='postDetailsCommentsExistingComment'>
                                <strong>{c.split(': ')[0]}</strong>
                                {c.split(':')[1]}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='postDetailsCommentsNew'>
                        <div className='postDetailsCommentsNewTitle'>Write a comment :</div>
                        <input className='postDetailsCommentsNewInput inputHover' 
                                type='text' 
                                placeholder='  Comment' 
                                //value={postData.message} 
                                //onChange={(e) => setPostData({ ...postData, message: e.target.value })}
                        />
                        <button className='postDetailsCommentsNewSubmit' >COMMENT</button>                        
                    </div>
                </div>

            </div>
            <div className='postDetailsImageSection'>
                <img className='postDetailsImage' src={post.selectedFile ||'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt='no_image'/>
            </div>        
        </div> 
        
        <div className='postDetailsSimilarPostsContainer'>
            <div className='postDetailsSimilarPostsYMAL'>You might also like :</div>
            <hr className='pageDivider'/>
            <div className='postDetailsSimilarPosts'>                
                {recommendedPosts.map(({ title, name, message, likes, selectedFile, _id }) => (
                    <div className='postDetailsSimilarPost' onClick={() => openPost(_id)} key={_id}>
                        <div className='postDetailsSimilarPostTitle'>{title}</div>
                        <div className='postDetailsSimilarPostCreator'>{name}</div>
                        <div className='postDetailsSimilarPostMessage'>{message}</div>
                        <div className='postDetailsSimilarPostLikes'>Likes : {likes.length}</div>
                        <img className='postDetailsSimilarPostImage' src={selectedFile}/>
                    </div>
                    ))}                
            </div>
        </div>       
    </div>
  )
}

export default PostDetails;
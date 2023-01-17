import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { likePost, deletePost } from '../../../actions/posts';

import './Post.css';

import moment from 'moment';
import {AiFillLike,AiOutlineLike,AiFillDelete} from 'react-icons/ai';
import {BsThreeDots} from 'react-icons/bs';

function Post({post, setCurrentId}) {

    const user = JSON.parse(localStorage.getItem('profile'));
    const [likes, setLikes] = useState(post?.likes);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const userId = user?.result?._id;
    const hasLikedPost = post.likes.find((like) => like === userId);

    const handleLike = async () => {
        dispatch(likePost(post._id));

        if (hasLikedPost) {
        setLikes(post.likes.filter((id) => id !== userId));
        } else {
        setLikes([...post.likes, userId]);
        }
    };

    const Likes = () => {
        if (likes.length > 0) {
        return likes.find((like) => like === userId)
            ? (
            <div className='postLikeSection'>
                <div className='postLikeIcon'>
                    <AiFillLike color = 'rgb(69, 69, 196)' fontSize= '1.5em'/>
                </div>
                <div className='postLikeCount'>
                    {likes.length > 2 ? `YOU AND ${likes.length - 1} OTHERS` : `${likes.length} LIKE${likes.length > 1 ? 'S' : ''}` }
                </div>
            </div>
            ) : (
            <div className='postLikeSection'>
                <div className='postLikeIcon'>
                    <AiOutlineLike color = 'rgb(69, 69, 196)' fontSize= '1.5em' />
                </div>
                <div className='postLikeCount'>
                    {likes.length} {likes.length === 1 ? 'LIKE' : 'LIKES'}
                </div>
            </div>
            );
        }

        return (
        <div className='postLikeSection'>
            <div className='postLikeIcon'>
                <AiOutlineLike color = 'rgb(69, 69, 196)' fontSize= '1.5em'/>
            </div>
            <div className='postLikeCount'>
                LIKE
            </div>
        </div>
        )
    };

    const openPost = (e) => {
        navigate(`/posts/${post._id}`);
    };
  
  return (
    <div className='postContainer' onClick={openPost}>
        <img className='postImage' src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt='no_image'/>

        <div className='postCreatedDetails'>
            <div className='postCreatorName'>{post.name}</div>
            <div className='postCreatedDate'>{moment(post.createdAt).fromNow()}</div>
        </div>

        <div className='postEditButton'>

            {(user?.result?._id === post?.creator) && 
                <BsThreeDots color = 'white' fontSize= '1.5em' 
                onClick={ (e) => { 
                e.stopPropagation();
                setCurrentId(post._id);
                }}
                />               
            }            
        </div>

        <div className='postTags' >
            {post.tags.map((tag) => `#${tag} `)}
        </div>

        <div className='postTitle' >
            {post.title}
        </div>

        <div className='postMessage' >
            {post.message.split(' ').splice(0, 20).join(' ')}...
        </div>
        
        <div className='postLikeDeleteContainer'>

            <span className='postLikeSection'>
                <>
                    { user?.result?(
                        <div onClick={(e) => {
                            e.stopPropagation();
                            handleLike();
                            }}
                        >
                            <Likes/>
                        </div>
                    ):
                    <>
                        <span className='postLikeIcon'>
                            <AiOutlineLike color = '#7a7a7a' fontSize= '1.5em' />
                        </span>
                        <span className='postLikeCountGrey'>{`${likes.length} LIKES`}</span>
                    </>
                    }
                </>

            </span>
            
            <>
            {  (user?.result?._id === post?.creator) && (
                <span className='postDeleteSection' 
                      onClick={(e) => {
                        e.stopPropagation();
                        dispatch(deletePost(post._id));
                        navigate('/posts');
                      }}
                >
                    <span className='postDeleteIcon'>
                        <AiFillDelete color='red' fontSize='1.3em'/>
                    </span>                
                    <span className='postDeleteText'>{' DELETE'}</span>
                </span>
                )
            }
            </>

        </div>
        
        
    </div>
  )
}

export default Post;
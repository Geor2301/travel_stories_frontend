import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../actions/posts';
import { useNavigate } from 'react-router-dom';
import { createPost, updatePost, getPostsBySearch } from '../../actions/posts';
import FileBase from 'react-file-base64';

import './Form.css'

function Form({ currentId, setCurrentId }) {

  const numberOfPages = useSelector((state) => state.posts.numberOfPages);
  const pageNumbers =[];
  for(let i=1; i<=numberOfPages; i++){
    pageNumbers.push(i);
  };

  const [page, setPage] = useState(1);
  const [postData, setPostData] = useState({ title: '', message: '', tags: [], selectedFile: '' });
  const post = useSelector((state) => (currentId ? state.posts.posts.find((message) => message._id === currentId) : null));
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [searchTags, setSearchTags] = useState([]);
  
  useEffect(() => {
    if (page) {
      dispatch(getPosts(page));
    }
  }, [page]);

  
  const handlePaginationClick = (pg) =>{
    setPage(pg);
  }
  
  const clear = () => {
    setCurrentId(0);
    setPostData({ title: '', message: '', tags: [], selectedFile: '' });
  };

  useEffect(() => {
    if (!post?.title) clear();
    if (post) setPostData(post);
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createPost({ ...postData, name: user?.result?.name }, navigate));
      clear();
    } else {
      dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
      clear();
      window.location.reload(false);
    }
    
  };

  const searchPost = () => {
    if (search.trim() || searchTags) {
      dispatch(getPostsBySearch({ search, searchTags: searchTags.join(',') }));
      navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${searchTags.join(',')}`);
    } else {
      navigate('/');
    }
  };  
   
  return (
    <div className='formContainer'>
        
        <div className='formSearchInputContainer'>
          <input className='formSearchInputText inputHover' 
                 type='text' 
                 placeholder='  Search Posts'
                 value={search}
                 onChange={(e) => setSearch(e.target.value )}
          />
          <input className='formSearchInputTags inputHover' 
                 type='text' 
                 placeholder='  Search Tags'
                 onChange={(e) => setSearchTags(e.target.value.replace(/ /g,'').split('#').filter(tag => tag ) )}
          />
          <button className='formSearchButton' onClick={searchPost}>SEARCH</button>
        </div>

        <div className='formCreatePostContainer'>
          {user?.result?(
            <>
              <div className='formCreatePostHeading'>
                {currentId ? `Editing "${post?.title}"` : 'Creating a Story'}
              </div>
              <input className='formCreatePostTitle inputHover' 
                     type='text' 
                     placeholder='  Title' 
                     value={postData.title} 
                     onChange={(e) => setPostData({ ...postData, title: e.target.value })}
              />
              <input className='formCreatePostMessage inputHover' 
                     type='text' 
                     placeholder='  Message' 
                     value={postData.message} 
                     onChange={(e) => setPostData({ ...postData, message: e.target.value })}
              />
              <input className='formCreatePostTags inputHover' 
                     type='text' 
                     placeholder='  Hashtags' 
                     defaultValue={postData.tags.length==0?'':`#${postData.tags.join(' #')}`}
                     onChange={(e) => setPostData({ ...postData, tags: e.target.value.replace(/ /g,'').split('#').filter(tag => tag ) })}
              />
              <FileBase className='formCreatePostFile' 
                        type='file' 
                        name='selectedFile' 
                        onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}
              />
              <button className='formCreatePostSubmit' onClick={handleSubmit}>SUBMIT</button>
              <button className='formCreatePostClear' onClick={clear}>CLEAR</button>
           </>
          ):(
            <div>
              Please Sign In to create your own posts and like others' posts.
            </div>
          )
           
          }
        </div>
        
        <div className='formPaginationContainer'>         
          {pageNumbers.map((pg, index) => (
            <button key={index} className={`formPaginationButton-${page==pg?'active':'inactive'}`} onClick={() => handlePaginationClick(pg)} >
              {pg}
            </button>
            /*className={page == currentPage ? "active" : ""}>*/
          ))}          
        </div>        

    </div>
  )
}

export default Form;
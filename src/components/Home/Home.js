import React,{ useState } from 'react';

import './Home.css'

import Posts from "../Posts/Posts";
import Form from "../Form/Form";

function Home() {

  const [currentId, setCurrentId] = useState(0);

  return (
    <div className="homeContainer">                 
        <Posts setCurrentId={setCurrentId}/>
        <Form currentId={currentId} setCurrentId={setCurrentId}/>
    </div>   
  )
}

export default Home
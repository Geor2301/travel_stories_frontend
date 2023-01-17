import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signin, signup } from '../../actions/auth';

import './Auth.css';
import {RiLock2Fill} from 'react-icons/ri';

const initialState = { firstName: '', lastName: '', email: '', password: ''};

function Auth() {

  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log(form);
    if (isSignup) {                       // Sending the navigate function to api actions so that after login, 
      dispatch(signup(form, navigate));   // we can navigate back to the home page posts.
    } else {
      dispatch(signin(form, navigate));
    }
  };
  
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className='authScreen'>
        <div className='authContainer'>
            
            <div className='authLogo'>
                <RiLock2Fill color = 'white' fontSize= '1.5em' />
            </div>
            <div className='authTitle'>{ isSignup ? 'Sign up' : 'Sign in' }</div>
            {isSignup? (
                <span className='authNameSection'>
                    <input className='authFirstName inputHover' type='text' placeholder=' First Name *' name='firstName' onChange={handleChange}/>
                    <input className='authLastName inputHover' type='text' placeholder=' Last Name *' name='lastName' onChange={handleChange}/>
                </span>
            ):null
            }
            <input className='authEmailId inputHover' type='text' placeholder=' Email *' name='email' onChange={handleChange}/>
            <input className='authPassword inputHover' placeholder=' Password *' name='password' onChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword}/>
            <button className='authSubmit' onClick={handleSubmit}>
                { isSignup ? 'SIGN UP' : 'SIGN IN' }
            </button>
            <button className='authSwitchSignIn' onClick={switchMode} >
                { isSignup ? 'ALREADY HAVE AN ACCOUNT? SIGN IN' : 'DON\'T HAVE AN ACCOUNT? SIGN UP' }
            </button>

        </div>
    </div>
  )
}

export default Auth
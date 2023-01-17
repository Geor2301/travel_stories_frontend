import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation} from 'react-router-dom';
import {Link} from 'react-router-dom';
import './Navbar.css';

import memoriesLogo from '../../images/memoriesLogo.png';
import memoriesText from '../../images/memoriesText.png';

function Navbar() {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  
  const logOut = () => {
    dispatch({ type: 'LOGOUT' });

    navigate('/auth');

    setUser(null);
  };

  useEffect(() => {       // To ensure that user details are updated on navbar after login is completed
   setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);
    
  return (
    <div className='navbarContainer'>
        <Link to='/'>
          <div className='navbarTitleAndText'>   {/* Need to make this Link later */}
            <img className='navbarTitle' src={memoriesText} alt="icon" /> 
            
          </div>
        </Link>

        <div className='navbarUserLogin'>
          {user?.result ? (
            <div className='navbarSignedUserDetails'>
              <span className='navbarSignedUserNameAndTagContainer'>
                <span className='navbarSignedUserNameTag'>
                  {user?.result.name.charAt(0)}
                </span>
                <span className='navbarSignedUserName'>
                  {user?.result.name}
                </span>
              </span>
              <button className='navbarSignedUserLogoutBtn' onClick={logOut}>LOGOUT</button>
            </div>                 
            ):
            <div className='navbarNotSignedInUser'>
              <Link to="/auth">
                <button className='navbarSignInBtn'>SIGN IN</button>
              </Link>
            </div>
          }
        </div>
        
    </div>
  )
}

export default Navbar;
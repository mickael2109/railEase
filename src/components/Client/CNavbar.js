import React from 'react';
import { FaCaretDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const CNavbar = () => {
    return (
        <div className='navbar-education'>
             <div className='icon-navbar'>
                {/* <div className='icon'><i><FaCog/></i></div> */}
               
                {/* <OverlayTrigger placement="bottom" overlay={tooltip}>
                  <div className='icon' onClick={getColonneNull}><i><FaExclamationCircle/></i><div className={`${isUserInfoNul ? 'pointAlert' : 'point'}`} ></div></div>
                </OverlayTrigger> */}
             </div>
             <div className='info-user'>
                <div className='profile-image'>
                    <img src='../media/user.png' alt='profile'/>
                </div>
                <div className='profile-info'>
                    <span>Mickael<i><Link to='/admin/parametre'><FaCaretDown/></Link></i></span>
                </div>
             </div>
        </div>
    );
};

export default CNavbar;
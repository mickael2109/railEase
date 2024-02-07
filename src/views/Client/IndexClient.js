import React from 'react';
import { Outlet } from 'react-router-dom';
import CSidebar from '../../components/Client/CSidebar';
import CNavbar from '../../components/Client/CNavbar';

const IndexClient = () => {
    return (
        <div className='adminPage'>
             <div className='sidebar_admin' id='sidebarFront'>
                <CSidebar/>
            </div>
            <div className='contentPageAdmin'>
                <div className='navbar_admin'>
                    <CNavbar/>
                </div>
                <div className='borderContenuAdmin'>
                    <div className='contenuAdmin'>
                        <Outlet/>
                    </div>
                </div>
            </div>
           
        </div>
    );
};

export default IndexClient;
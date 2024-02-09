import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import CSidebar from '../../components/Client/CSidebar';
import { Utils } from '../../_utils/utils';

const IndexClient = () => {

    useEffect(() => {
        Utils.verifyToken()
    }, [])

    return (
        <div className='adminPage'>
             <div className='sidebar_admin' id='sidebarFront'>
                <CSidebar/>
            </div>
            <div className='contentPageAdmin'>
                {/* <div className='navbar_admin'>
                    <CNavbar/>
                </div> */}
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
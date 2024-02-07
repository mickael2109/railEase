import React from 'react';
import { Route, Routes } from 'react-router-dom';
import IndexAdmin from '../views/Admin/IndexAdmin'
import { Utils } from '../_utils/utils';

const AdminRoute = () => {
    return (
        <Routes>
            <Route path='/' element={<IndexAdmin/>}/>
            
            <Route path='*' element={<Utils.PageNotFound/>}/>
        </Routes>
    );
};

export default AdminRoute;
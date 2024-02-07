import React from 'react';
import { Route, Routes } from 'react-router-dom';
import IndexController from '../views/Controller/IndexController'
import { Utils } from '../_utils/utils';

const ControllerRoute = () => {
    return (
        <Routes>
            <Route path='/' element={<IndexController/>}/>
            <Route path='*' element={<Utils.PageNotFound/>}/>
        </Routes>
    );
};

export default ControllerRoute;
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../views/Auth/Login';
import Create from '../views/Auth/Create';
import '../assets/Auth/styleAuth.css'
import { Utils } from '../_utils/utils';

const AuthRoute = () => {
    return (
        <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/create' element={<Create/>}/>
            <Route path='*' element={<Utils.PageNotFound/>}/>
        </Routes>
    );
};

export default AuthRoute;
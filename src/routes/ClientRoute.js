import React from 'react';
import { Route, Routes } from 'react-router-dom';
import IndexClient from '../views/Client/IndexClient'
import { Utils } from '../_utils/utils';

const ClientRoute = () => {
    return (
        <Routes>
            <Route path='/' element={<IndexClient/>}/>
            <Route path='*' element={<Utils.PageNotFound/>}/>
        </Routes>
    );
};

export default ClientRoute;
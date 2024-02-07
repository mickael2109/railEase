import React from 'react';
import { Route, Routes } from 'react-router-dom';
import IndexClient from '../views/Client/IndexClient'
import { Utils } from '../_utils/utils';
import '../assets/Client/styleClient.css'
import Gare from '../views/Client/Gare';

const ClientRoute = () => {
    return (
        <Routes>
            <Route path='/' element={<IndexClient/>}>
                <Route index element={<Gare/>}/>
            </Route>
            <Route path='*' element={<Utils.PageNotFound/>}/>
        </Routes>
    );
};

export default ClientRoute;
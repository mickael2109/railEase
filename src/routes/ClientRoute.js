import React from 'react';
import { Route, Routes } from 'react-router-dom';
import IndexClient from '../views/Client/IndexClient'
import { Utils } from '../_utils/utils';
import '../assets/Client/styleClient.css'
import Gare from '../views/Client/Gare';
import { Reservation, TrainGare } from '../components/Client/GareComp';
import Historique from '../views/Client/Historique';

const ClientRoute = () => {
    return (
        <Routes>
            <Route path='/' element={<IndexClient/>}>
                <Route index element={<Gare/>}/>
                <Route path='/trainGare/:id' element={<TrainGare/>}/>
                <Route path='/trainGare/reservation' element={<Reservation/>}/>
                <Route path='/historique' element={<Historique/>}/>
            </Route>
            <Route path='*' element={<Utils.PageNotFound/>}/>
        </Routes>
    );
};

export default ClientRoute;
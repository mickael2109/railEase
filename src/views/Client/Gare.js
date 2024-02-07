import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { gareService } from '../../_services/gare.service';
import { Utils } from '../../_utils/utils';

const Gare = () => {

    const [gare, setGare] = useState([])
    const [loading, setLoading] = useState(true);

    const getAllGare = async () => {
        try {
            setLoading(true);
            gareService.getGareAll()
            .then((res) => {
                setGare(res.data.gares)
                console.log(res.data.gares)
            })
        } catch (error) {
            Utils.errorPage(error)
        }finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getAllGare();
    }, [])
    

    return (
        <div>
            {
                loading ? (
                    <div className="loading-container">
                        <div className="loading-spinner"></div>
                    </div>
                ) : (
                    <>
                        {Array.isArray(gare) && gare.length > 0 ? (
                            <>
                                <table className='styled-table'>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Gare</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {  gare.map((gareItem) => (
                                            <tr key={gareItem.id}>
                                                <td>{gareItem.id}</td>
                                                <td>{gareItem.nom}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </>
                        ) : (
                            <div>Aucun gare.</div>
                        )}
                    </>
                )
            }
        </div>
    );
};

export default Gare;
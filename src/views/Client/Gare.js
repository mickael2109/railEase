import React, { useEffect, useState } from 'react';
import { gareService } from '../../_services/gare.service';
import { Utils } from '../../_utils/utils';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer } from "react-leaflet"
import { GareMap } from '../../components/Client/GareComp';
import "leaflet-control-geocoder/dist/Control.Geocoder.css"
import "leaflet-control-geocoder/dist/Control.Geocoder.js"
import L from "leaflet"

const Gare = () => {
    const [gare, setGare] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const position = [-18.8792, 47.5079]
    let DefaultIcon = L.icon({
        iconUrl : "/marker-icon.png",
        iconSize : [25, 41],
        iconAnchor: [10, 41],
        popupAnchor: [2, -40]
      });
    L.Marker.prototype.options.icon = DefaultIcon;

    const getAllGare = async () => {
        try {
            setLoading(true);
            gareService.getGareAll()
            .then((res) => {
                setGare(res.data.gares);
            })
        } catch (error) {
            Utils.errorPage(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getAllGare();
    }, []);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredGare = gare.filter((gareItem) => {
        return gareItem.nom.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <div className='gare'>
            <div className='header-page'>
                <div className='titre-page'>
                    <span>Liste Gare</span>
                </div>
                <div className='search-gare'>
                    <form className='search form-inline my-2 my-lg-0'>
                        <input className='input' type='search' placeholder='Rechercher' aria-label='Rechercher' value={searchTerm} onChange={handleSearchChange} />
                    </form>
                </div>
            </div>
            <div className='gare-content'>
                <div className='gare-list'>
                    {loading ? (
                        <div className="loading-container">
                            <div className="loading-spinner"></div>
                        </div>
                    ) : (
                        <>
                            {filteredGare.length > 0 ? (
                                
                                filteredGare.map((gareItem) => (
                                    <Link to={`/client/trainGare/${gareItem.id}`} key={gareItem.id}>
                                        <div className="card-item">
                                            <div className="card-image">
                                                <img src={process.env.PUBLIC_URL+`./media/gare/${gareItem.nom}.jpg`} alt={gareItem.nom}/>
                                            </div>
                                            <div className="card-body">
                                                <div className="card-title">
                                                    <h4>{gareItem.nom}</h4>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <div>Aucune gare trouvée.</div>
                            )}
                        </>
                    )}
                </div>
                <div className='gare-map'>
                    <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
                        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                        <GareMap/>
                    </MapContainer>
                </div>
            </div>
        </div>
    );
};

export default Gare;

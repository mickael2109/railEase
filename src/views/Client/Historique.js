import React from 'react';
import { MapContainer, TileLayer } from "react-leaflet"
import { GareMap } from '../../components/Client/GareComp';
import "leaflet-control-geocoder/dist/Control.Geocoder.css"
import "leaflet-control-geocoder/dist/Control.Geocoder.js"
import L from "leaflet"
const Historique = () => {

    const position = [-18.8992, 47.5579]
    let DefaultIcon = L.icon({
        iconUrl : "/marker-icon.png",
        iconSize : [25, 41],
        iconAnchor: [10, 41],
        popupAnchor: [2, -40]
      });
    L.Marker.prototype.options.icon = DefaultIcon;


    return (
        <div className='historique'>
            <div className='gare-map'>
                <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
                    <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                    <GareMap/>
                </MapContainer>
            </div>
        </div>
    );
};

export default Historique;
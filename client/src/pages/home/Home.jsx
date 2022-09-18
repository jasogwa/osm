import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from "leaflet";
import 'leaflet/dist/leaflet.css';
import osm from "./osm-provider";
import  "./style.css";
import Footer from "../../componets/footer/Footer";
import cities from "./cities.json";

const ICON = new L.Icon({
    iconUrl: require("../../asset/marker.png"),
    iconSize: [35, 45],
    iconAnchor: [17, 46],
    popupAnchor: [0, -46],
});

const Home = () => {
    const [center] = useState({ lat: 13.084622, lng: 80.248357 });
    const ZOOM_LEVEL = 9;
    const mapCenter = `13.084622, 80.248357`;
    const map = "-96.679688, -9.275622, 125.332031, 69.411242";
    
    return (
        <>
        <MapContainer center={center} zoom={ZOOM_LEVEL} scrollWheelZoom={true}>
            <TileLayer
                attribution={osm.maptiler.attribution}
                url={osm.maptiler.url}
            />
            {
                cities.map((city, id) => 
                    <Marker 
                        position={[city.lat, city.lng]} 
                        icon={ICON}
                        key={id}
                    >
                        <Popup>
                            <b>{city.city}</b>
                        </Popup>
                    </Marker>
                )
            }
        </MapContainer>
        <Footer 
            map={map}
            mapCenter={mapCenter} 
        />
        </>
    )
}

export default Home
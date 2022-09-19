import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import L from "leaflet";
import 'leaflet/dist/leaflet.css';
import osm from "./osm-provider";
import  "./style.css";
import { publicUrl } from "../../requestUrl";
import Footer from "../../componets/footer/Footer";

L.Icon.Default.mergeOptions({
   iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
   iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const Home = () => {
    const [center] = useState({ lat: 13.084622, lng: 80.248357 });
    const ZOOM_LEVEL = 9;
    const [locations, setLocations] = useState({});
    const [isLoading, setLoading] = useState(true);

    const getGeoJson = async () =>{
        try {
          const response  = await publicUrl.post("get-geo-json/");
          setLocations(response.data);
          setLoading(false);
        } catch (error) {
          return "An error has occurred: " + error.message;
        }
    }

    useEffect(()=>{
        getGeoJson()
    },[]);
    
    if (isLoading) return "Loading...";

    return (
        <>
        <MapContainer center={center} zoom={ZOOM_LEVEL}>
            <TileLayer
                attribution={osm.maptiler.attribution}
                url={osm.maptiler.url}
            />
            <GeoJSON data={locations} />
        </MapContainer>
        </>
    )
}

export default Home
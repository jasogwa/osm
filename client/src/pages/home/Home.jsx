import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import osm from "./osm-provider";
import "./style.css";
import { publicUrl } from "../../requestUrl";

import {
  Container,
  Wapper,
  CenterBG,
  Button,
  Form,
  Input,
  Error,
  Success,
} from "./style";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const Home = () => {
  const [center] = useState({ lat: 13.084622, lng: 80.248357 });
  const ZOOM_LEVEL = 9;
  const [locations, setLocations] = useState({});
  const [isLoading, setLoading] = useState(true);

  //for longitude and latitude
  const [miniLat, setMiniLat] = useState("");
  const [maxLat, setMaxLat] = useState("");
  const [miniLon, setMiniLon] = useState("");
  const [maxLon, setMaxLon] = useState("");

  //form error
  const [miniLatError, setMiniLatError] = useState("");
  const [maxLatError, setMaxLatError] = useState("");
  const [miniLonError, setMiniLonError] = useState("");
  const [maxLonError, setMaxLonError] = useState("");

  //success message
  const [successMsg, setSuccessMsg] = useState("");

  const handleMiniLonChange = (e) => {
    setSuccessMsg("");
    setMiniLonError("");
    setMiniLon(e.target.value);
  };

  const handleMiniLatChange = (e) => {
    setSuccessMsg("");
    setMiniLatError("");
    setMiniLat(e.target.value);
  };

  const handleMaxLonChange = (e) => {
    setSuccessMsg("");
    setMaxLonError("");
    setMaxLon(e.target.value);
  };

  const handleMaxLatChange = (e) => {
    setSuccessMsg("");
    setMaxLatError("");
    setMaxLat(e.target.value);
  };

  const getGeoJson = async () => {
    try {
      const response = await publicUrl.post("get-geo-json/");
      setLocations(response.data);
      setLoading(false);
    } catch (error) {
      return "An error has occurred: " + error.message;
    }
  };

  const handleSearch = (e) => {
    e.preventDefault(e);
    if (miniLon !== "") {
      if (miniLon > 180 || miniLon < -180) {
        setMiniLonError("Invalid range");
      }
    } else {
      setMiniLonError("value required!");
    }

    if (maxLat !== "") {
      if (maxLat > 90 || maxLat < -90) {
        setMaxLatError("Invalid range");
      }
    } else {
      setMaxLatError("required with range(-90 to 90)");
    }

    if (miniLat !== "") {
      if (miniLat > 90 || miniLat < -90) {
        setMiniLatError("Invalid range");
      }
    } else {
      setMiniLatError("required with range(-90 to 90)");
    }

    if (maxLon !== "") {
      if (maxLon > 180 || maxLon < -180) {
        setMaxLonError("Invalid range");
      }
    } else {
      setMaxLonError("required with range(-180 to 180");
    }
  };

  useEffect(() => {
    getGeoJson();
  }, []);

  if (isLoading) return "Loading...";

  return (
    <>
      <MapContainer center={center} zoom={ZOOM_LEVEL}>
        <TileLayer
          attribution={osm.maptiler.attribution}
          url={osm.maptiler.url}
        />
        <GeoJSON data={locations} />

        <Container>
          <Wapper>
            <CenterBG>Enter the coordinates</CenterBG>
            <Form>
              {successMsg && <Success>{successMsg}</Success>}
              <Input
                type="number"
                placeholder="min_lon range(-180 to 180)"
                onChange={handleMiniLonChange}
                value={miniLon}
              />
              {maxLonError && <Error>{maxLonError}</Error>}
              <Input
                type="number"
                placeholder="min_lat range(-90 to 90)"
                onChange={handleMiniLatChange}
                value={miniLat}
              />
              {miniLatError && <Error>{miniLatError}</Error>}
              <Input
                type="number"
                placeholder="max_lon range(-180 to 180)"
                onChange={handleMaxLonChange}
                value={maxLon}
              />
              {maxLonError && <Error>{maxLonError}</Error>}
              <Input
                type="number"
                placeholder="max_lat range(-90 to 90)"
                onChange={handleMaxLatChange}
                value={maxLat}
              />
              {maxLatError && <Error>{maxLatError}</Error>}

              <Button onClick={handleSearch}>Search</Button>
            </Form>
          </Wapper>
        </Container>
      </MapContainer>
    </>
  );
};

export default Home;

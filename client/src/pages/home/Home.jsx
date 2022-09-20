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
  const [locations, setLocations] = useState([]);

  //for longitude and latitude
  const [miniLonLat, setMiniLonLat] = useState("");
  const [maxLonLat, setMaxLonLat] = useState("");

  //form error
  const [miniLonLatError, setMiniLonLatError] = useState("");
  const [maxLonLatError, setMaxLonLatError] = useState("");

  //success message
  const [successMsg, setSuccessMsg] = useState("");

  const handleMiniLonLatChange = (e) => {
    setSuccessMsg("");
    setMiniLonLatError("");
    setMiniLonLat(e.target.value);
  };

  const handleMaxLonLatChange = (e) => {
    setSuccessMsg("");
    setMaxLonLatError("");
    setMaxLonLat(e.target.value);
  };

  const checkIfValidlatitudeAndlongitude = (str) => {
    // Regular expression to check if string is a latitude and longitude
    const regexExp = /^((\-?|\+?)?\d+(\.\d+)?),\s*((\-?|\+?)?\d+(\.\d+)?)$/gi;
    return regexExp.test(str);
  };

  const handleSearch = async (e) => {
    e.preventDefault(e);
    if (miniLonLat !== "") {
      if (checkIfValidlatitudeAndlongitude(miniLonLat) != true) {
        setMiniLonLatError("Invalid lon-lat combination");
      }
    } else {
      setMiniLonLatError("value required!");
    }

    if (maxLonLat !== "") {
      if (checkIfValidlatitudeAndlongitude(maxLonLat) != true) {
        setMaxLonLatError("Invalid lon-lat combination");
      }
    } else {
      setMaxLonLatError("value required!");
    }
    if (
      miniLonLat !== "" &&
      checkIfValidlatitudeAndlongitude(miniLonLat) === true &&
      maxLonLat !== "" &&
      checkIfValidlatitudeAndlongitude(maxLonLat) === true
    ) {
      let values = `${miniLonLat + "," + maxLonLat}`;
      try {
        const response = await publicUrl.get("get-geo-json/" + values);
        const cordinates = response.data;
        setLocations(cordinates);
      } catch (error) {
        console.log("An error has occurred: " + error.message);
      }
    }
  };

  const MyData = () => {
    if (JSON.stringify(locations).length > 2) {
      return <GeoJSON data={locations} />;
    }
  };

  useEffect(() => {}, [locations]);

  return (
    <>
      <MapContainer center={center} zoom={ZOOM_LEVEL}>
        <TileLayer
          attribution={osm.maptiler.attribution}
          url={osm.maptiler.url}
        />
        <MyData />
        <Container>
          <Wapper>
            <CenterBG>Enter the coordinates</CenterBG>
            <Form>
              {successMsg && <Success>{successMsg}</Success>}
              <Input
                type="text"
                placeholder=""
                onChange={handleMiniLonLatChange}
                value={miniLonLat}
              />
              {miniLonLatError && <Error>{miniLonLatError}</Error>}

              <Input
                type="text"
                placeholder=""
                onChange={handleMaxLonLatChange}
                value={maxLonLat}
              />
              {maxLonLatError && <Error>{maxLonLatError}</Error>}

              <Button onClick={handleSearch}>Search</Button>
            </Form>
          </Wapper>
        </Container>
      </MapContainer>
    </>
  );
};

export default Home;

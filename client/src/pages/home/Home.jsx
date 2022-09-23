import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet";
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
  Label,
} from "./style";

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

  L.Icon.Default.mergeOptions({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
  });

  const handleMiniLonLatChange = (e) => {
    setMiniLonLatError("");
    setMiniLonLat(e.target.value);
  };

  const handleMaxLonLatChange = (e) => {
    setMaxLonLatError("");
    setMaxLonLat(e.target.value);
  };

  const checkIfValidlatitudeAndlongitude = (str) => {
    // Regular expression to check if string is a latitude and longitude
    const regexExp = /^((\/-?|\+?)?\d+(\.\d+)?),\s*((\/-?|\+?)?\d+(\.\d+)?)$/gi;
    return regexExp.test(str);
  };

  const handleSearch = async (e) => {
    e.preventDefault(e);
    if (miniLonLat !== "") {
      if (checkIfValidlatitudeAndlongitude(miniLonLat) !== true) {
        setMiniLonLatError("Invalid lon-lat combination");
      }
    } else {
      setMiniLonLatError("value required!");
    }

    if (maxLonLat !== "") {
      if (checkIfValidlatitudeAndlongitude(maxLonLat) !== true) {
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

  const getDimension = ([array]) => {
    return 1 + (Array.isArray(array) && getDimension(array));
  };
  const GeoJsonComponent = () => {
    const map = useMap();
    if (JSON.stringify(locations).length > 2) {
      let json = JSON.parse(JSON.stringify(locations.features));
      if (json.length !== 0) {
        let array = [];
        json.forEach((element) => {
          array.push(element.geometry.coordinates);
        });
        if (getDimension(array) === 1) {
          map.flyTo(array, 3);
        }
        if (getDimension(array) === 2) {
          map.flyTo(array[0], 3);
        }
        if (getDimension(array) === 3) {
          map.flyTo(array[0][0], 3);
        }
        return <GeoJSON data={locations} />;
      }
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
        <GeoJsonComponent />
        <Container>
          <Wapper>
            <CenterBG>Enter the coordinates</CenterBG>
            <Form>
              <Label>minLon,minLat</Label>
              <Input
                type="text"
                placeholder="miniLon,miniLat"
                onChange={handleMiniLonLatChange}
                value={miniLonLat}
              />
              {miniLonLatError && <Error>{miniLonLatError}</Error>}

              <Label>maxLon,maxLat</Label>
              <Input
                type="text"
                placeholder="maxLon,maxLat"
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

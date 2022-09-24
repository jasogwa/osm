import React from "react";
import Home from "../Home";
import "jest-styled-components";

import Enzyme, { shallow } from "enzyme";
import Adapter from "@cfaester/enzyme-adapter-react-18";
Enzyme.configure({ adapter: new Adapter() });

test("render home component", () => {
  shallow(<Home />);
});

test("render MapContainer", () => {
  const home = shallow(<Home />);
  const container = "MapContainer TileLayer GeoJsonComponent";
  const content = "Container Wapper CenterBG Form";
  const items = "Label Input Button";
  home.find(container);
  home.find(content);
  home.find(items);
});

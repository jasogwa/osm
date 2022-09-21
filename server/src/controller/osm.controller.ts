import { Request, Response } from "express";
import fetch from "node-fetch";
import osmtogeojson from "osmtogeojson";

export default class OsmController {
  public getGeoJSON = async (req: Request, res: Response) => {
    try {
      const bbox = "bbox=" + req.params.value;
      const url = `https://www.openstreetmap.org/api/0.6/map?${bbox}`;
      const response = await this.callUrl(url);
      const osm = osmtogeojson(response);
      res.json(response);
    } catch (error) {
      console.log(error);
    }
  };

  public callUrl = async (url: string) => {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.log("Error: ", error);
    }
  };
}

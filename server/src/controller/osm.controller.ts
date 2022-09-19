import { Request, Response } from "express";
import fetch from "node-fetch";
import osmtogeojson from "osmtogeojson";

export default class OsmController {
  public getGeoJSON = async (req: Request, res: Response) => {
    try {
      const bbox = "bbox=13.20524,43.70861,13.22842,43.72338";
      const url = `https://www.openstreetmap.org/api/0.6/map?${bbox}`;
      const response = await this.callUrl(url);
      const osm = osmtogeojson(response);
      res.json(osm);
    } catch (error) {
      console.log(error);
    }
  };

  private callUrl = async (url: string) => {
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

import { Router } from "express";
import OsmController from "../controller/osm.controller";

const router = Router();
const osm = new OsmController();

router.get("/get-geo-json/:value", osm.getGeoJSON);

export default router;
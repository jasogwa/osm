import { Router } from "express";
import OsmController from "../controller/osm.controller";

const router = Router();
const osm = new OsmController();

router.post('/get-geo-json', osm.getGeoJSON);

export default router;
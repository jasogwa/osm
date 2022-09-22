import OsmController from "../../controller/osm.controller";
import indexRoutes from "../../routes/index";
const supertest = require("supertest");
const osm = new OsmController();

describe('GET /get-geo-json/:value', function() {
  let bbox: any = "bbox=0.00000,0.00000,0.00000,0.00000";
  test('responds with json',  async () =>{
     supertest(indexRoutes)
      .get('/get-geo-json/'+bbox)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
  });
});
  
describe("Geo Json Controller", () => {
  let bbox: any = "bbox=0.00000,0.00000,0.00000,0.00000";
  let url: any = `https://www.openstreetmap.org/api/0.6/map?${bbox}`;
  it("send request to url", async () => {
    const res = await osm.callUrl(url);
    expect(res).resolves;
  });

  it("get geo json", async () => {
    const res = await osm.getGeoJSON(url, bbox);
    expect(res).resolves;
  });
});

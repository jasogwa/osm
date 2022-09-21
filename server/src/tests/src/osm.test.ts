import OsmController from "../../controller/osm.controller";
const osm = new OsmController();

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

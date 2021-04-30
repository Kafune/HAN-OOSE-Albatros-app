import {Geometry} from "geojson";
import {MapsLine} from "../maps/MapsLine";

export class MapsLineMapper {
  /**
   * Maps a maps line to usable GeoJSON for the map.
   * @param {MapsLine | null} mapsLine
   * @returns {Geometry | void}
   */
  static toGeoJSON(mapsLine: MapsLine | null): Geometry | void {
    if (!mapsLine) {
      return;
    }

    return {
      type: 'LineString',
      coordinates: mapsLine.mapLineCoordinates,
    };
  }
}

import {IGeometry} from '../interface/IGeometry';
import {MapsCoordinate} from './MapsCoordinate';
import {Position} from 'geojson';

/**
 * MapsLine a object that can be used as GEOJson for a line
 * @export
 * @class MapsLine
 */
export class MapsLine {
  type: string;
  geometry: IGeometry;

  /**
   * Creates an instance of MapsLine.
   * @param {Array<MapsCoordinate>} coordinates
   */
  constructor(coordinates: Array<MapsCoordinate>) {
    this.type = 'Feature';
    this.geometry = {
      type: 'LineString',
      coordinates,
    };
  }

  /**
   * Gets the coordinates from a MapsLine.
   * @returns {Position}
   */
  getCoordinates(): Position[] {
    return this.geometry.coordinates.map((element: MapsCoordinate) =>
      element.toArray(),
    );
  }
}

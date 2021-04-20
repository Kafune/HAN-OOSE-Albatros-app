import {Geometry} from '../interface/geometry';
import {MapsCoordinate} from './MapsCoordinate';

/**
 * MapsLine a object that can be used as GEOJson for a line
 *
 * @author Robert Boudewijn
 * @date 2021/04/20
 * @export
 * @class MapsLine
 */
export class MapsLine {
  type: string;
  geometry: Geometry;

  /**
   * Creates an instance of MapsLine.
   * @author Robert Boudewijn
   * @date 2021/04/20
   * @param {Array<MapsCoordinate>} coordinates
   * @memberof MapsLine
   */
  constructor(coordinates: Array<MapsCoordinate>) {
    this.type = 'Feature';
    this.geometry = {
      type: 'LineString',
      coordinates,
    };
  }

  /**
   * getter
   *
   * @author Robert Boudewijn
   * @date 2021/04/20
   * @memberof MapsLine
   */
  getCordinates() {
    return this.geometry.coordinates.map(element=> element.toArray());
  }
}

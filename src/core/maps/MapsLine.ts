import {MapsCoordinate} from './MapsCoordinate';

/**
 * MapsLine a object that can be used as GEOJson for a line
 * @export
 * @class MapsLine
 */
export class MapsLine {
  coordinates: MapsCoordinate[];

  /**
   * Creates an instance of MapsLine.
   * @param {Array<MapsCoordinate>} coordinates
   */
  constructor(coordinates: MapsCoordinate[]) {
    this.coordinates = coordinates;
  }

  /**
   * Gets the coordinates from a MapsLine.
   * @returns {Position}
   */
  get mapLineCoordinates(): number[][] {
    return this.coordinates.map(coordinate => coordinate.toArray());
  }
}

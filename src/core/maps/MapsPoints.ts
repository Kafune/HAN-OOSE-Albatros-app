import {MapsCoordinate} from './MapsCoordinate';

/**
 * A mapPoint object can be used to make a point in a map
 * @export
 * @class MapsLine
 */
export class MapsPoint {
  coordinates: number[][];

  /**
   * Creates an instance of MapsLine.
   * @param {MapsCoordinate[]} coordinates
   */
  constructor(coordinates: MapsCoordinate[]) {
    this.coordinates = coordinates.map(coordinate => coordinate.toArray());
  }
}

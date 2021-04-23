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

  /**
   * The map() method creates a new array populated with the results
   * of calling a provided function on every element in the calling array.
   * @param {Function} funct
   * @returns {any[]}
   */
  map(funct: Function) {
    let x = [];
    for (let i in this.coordinates) {
      x.push(funct(this.coordinates[i]));
    }
    return x;
  }
}

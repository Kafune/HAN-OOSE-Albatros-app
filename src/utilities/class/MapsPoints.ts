import {MapsCoordinate} from './MapsCoordinate';

/**
 * A mapPoint object can be used to make a point in a map
 *
 * @author Robert Boudewijn
 * @date 2021/04/20
 * @export
 * @class MapsLine
 */
export class MapsPoint {
  coordinates: Array<Number[]>;

  /**
   * Creates an instance of MapsLine.
   * @author Robert Boudewijn
   * @date 2021/04/20
   * @param {Array<MapsCoordinate>} coordinates
   * @memberof MapsLine
   */
  constructor(coordinates: MapsCoordinate[]) {
    this.coordinates = coordinates.map(item => item.toArray());
  }

  /**
   * The map() method creates a new array populated with the results of calling a provided function on every element in the calling array.
   *
   * @author Robert Boudewijn
   * @date 2021/04/20
   * @memberof MapsLine
   * @param funct
   */
  map(funct: any) {
    let x = [];
    for (let i in this.coordinates) {
      x.push(funct(this.coordinates[i]));
    }
    return x;
  }
}

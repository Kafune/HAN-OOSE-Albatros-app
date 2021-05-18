import {Calculator} from '../helpers/Calculator';
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

  /**
   * Gets the last coordinate of the array of coordinates.
   *
   * @return {MapsCoordinate}
   * @memberof MapsLine
   */
  getLastCoordinate(): MapsCoordinate {
    return this.coordinates[this.coordinates.length - 1];
  }

  /**
   * Gets the first coordinate of the array of coordinates.
   *
   * @return {MapsCoordinate}
   * @memberof MapsLine
   */
  getfirstCoordinate(): MapsCoordinate {
    return this.coordinates[0];
  }

  /**
   * pushes a MapsCoordinate in the coordinates array
   *
   * @param {MapsCoordinate} mapsCoordinate
   * @memberof MapsLine
   */
  pushCoordinate(mapsCoordinate: MapsCoordinate) {
    this.coordinates.push(mapsCoordinate);
  }

  /**
   *Removes the first element from an array and returns it. If the array is empty, undefined is returned and the array is not modified.
   *
   * @return {(MapsCoordinate | undefined)}
   * @memberof MapsLine
   */
  shift(): MapsCoordinate | undefined {
    return this.coordinates.shift();
  }

  /**
   *calculates the total km of the maps line.
   * @return {number}
   * @memberof MapsLine
   */
  getTotalKm() {
    let lengthInKm = 0;
    let old: MapsCoordinate;
    let first = true;
    this.coordinates.forEach(element => {
      if (first) {
        first = false;
      } else {
        lengthInKm += Calculator.getDistanceFromLatLonInKm(
          old.latitude,
          old.longitude,
          element.latitude,
          element.longitude,
        );
      }
      old = element;
    });
    return lengthInKm;
  }
}

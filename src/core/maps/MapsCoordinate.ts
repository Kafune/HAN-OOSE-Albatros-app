import {Position} from 'geojson';

/**
 * A maps coordinate
 * @export
 * @class MapsCoordinate
 */
export class MapsCoordinate {
  longitude: number;
  latitude: number;

  /**
   * Creates an instance of MapsCoordinate.
   * @param {number} longitude
   * @param {number} latitude
   * @memberof MapsCoordinate
   */
  constructor(longitude: number, latitude: number) {
    this.longitude = longitude;
    this.latitude = latitude;
  }

  /**
   * Converts a MapsCoordinate to a usable Position.
   * @returns {Position}
   */
  toArray(): Position {
    return [this.longitude, this.latitude];
  }
}

/**
 * A maps coordinate
 *
 * @author Robert Boudewijn
 * @date 2021/04/20
 * @export
 * @class MapsCoordinate
 */
export class MapsCoordinate {
  longitude: Number;
  latitude: Number;

  /**
   * Creates an instance of MapsCoordinate.
   * @author Robert Boudewijn
   * @date 2021/04/20
   * @param {Number} longitude
   * @param {Number} latitude
   * @memberof MapsCoordinate
   */
  constructor(longitude: Number, latitude: Number) {
    this.longitude = longitude;
    this.latitude = latitude;
  }

  /**
   * To array
   *
   * @author Robert Boudewijn
   * @date 2021/04/20
   * @return {Array<Number>}
   * @memberof MapsCoordinate
   */
  toArray(): Array<Number> {
    return [this.longitude, this.latitude];
  }
}

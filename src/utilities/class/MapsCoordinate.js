/**
 * A maps coordinate
 *
 * @author Robert Boudewijn
 * @date 2021/04/20
 * @export
 * @class MapsCoordinate
 */
export class MapsCoordinate {
  longitude;
  latitude;

  /**
   * Creates an instance of MapsCoordinate.
   * @author Robert Boudewijn
   * @date 2021/04/20
   * @param {Number} longitude
   * @param {Number} latitude
   * @memberof MapsCoordinate
   */
  constructor(longitude, latitude) {
    this.longitude = longitude;
    this.latitude = latitude;
  }

  /**
   * To array
   *
   * @author Robert Boudewijn
   * @date 2021/04/20
   * @return {*} 
   * @memberof MapsCoordinate
   */
  toArray(){
    return [this.longitude, this.latitude]
  }

}

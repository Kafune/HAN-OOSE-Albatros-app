export class Calculator {
  /**
   * Converts a number to a usable radians.
   * @param {number} number
   * @returns {number}
   */
  static toRadians(number: number): number {
    return (number * Math.PI) / 180;
  }

  /**
   * Converts a number to usable degrees.
   * @param {number} number
   * @returns {number}
   */
  static toDegrees(number: number): number {
    return number * (180 / Math.PI);
  }

  /**
   * calculates the distance between two cordinates.
   *
   * @author Robert Boudewijn
   * @date 2021/05/18
   * @static
   * @param {number} lat1
   * @param {number} lon1
   * @param {number} lat2
   * @param {number} lon2
   * @return {number}
   * @memberof Calculator
   */
  static getDistanceFromLatLonInKm(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ) {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2 - lat1); // deg2rad below
    var dLon = this.deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) *
        Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
  }

  static deg2rad(deg: number) {
    return deg * (Math.PI / 180);
  }
}

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
}

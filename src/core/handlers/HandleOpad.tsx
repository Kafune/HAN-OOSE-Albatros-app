import {Position} from 'geojson';

/**
 * In this class is chosen to not inlude zoom because it changes to many times. Due to that, it has become a parameter
 */
export class HandleOpad {
  phaseOne = {breakPoint: 16, amount: 0.25};
  phaseTwo = {breakPoint: 12, amount: 0.7};
  phaseThree = {breakPoint: -1, amount: 1.5};
  mapsPoint: Position;
  exponent: number = 3;

  /**
   * Creates an instance of HandleOpad.
   * @param {Position} mapsPoint
   * @memberof HandleOpad
   */
  constructor(mapsPoint: Position) {
    this.mapsPoint = mapsPoint;
  }

  /**
   *  Handles up from a Opad.
   *
   * @param {number} zoom
   * @return {Position}
   * @memberof HandleOpad
   */
  handleUp(zoom: number): Position {
    if (zoom >= this.phaseOne.breakPoint) {
      return [
        this.mapsPoint[0],
        this.mapsPoint[1] + this.phaseOne.amount / zoom ** this.exponent,
      ];
    } else if (zoom >= this.phaseTwo.breakPoint) {
      return [
        this.mapsPoint[0],
        this.mapsPoint[1] + this.phaseTwo.amount / zoom ** this.exponent,
      ];
    } else {
      return [
        this.mapsPoint[0],
        this.mapsPoint[1] + this.phaseThree.amount / zoom ** this.exponent,
      ];
    }
  }

  /**
   *  Handles left from a Opad.
   *
   * @param {number} zoom
   * @return {Position}
   * @memberof HandleOpad
   */
  handleLeft(zoom: number): Position {
    if (zoom >= this.phaseOne.breakPoint) {
      return [
        this.mapsPoint[0] - this.phaseOne.amount / zoom ** this.exponent,
        this.mapsPoint[1],
      ];
    } else if (zoom >= this.phaseTwo.breakPoint) {
      return [
        this.mapsPoint[0] - this.phaseTwo.amount / zoom ** this.exponent,
        this.mapsPoint[1],
      ];
    } else {
      return [
        this.mapsPoint[0] - this.phaseThree.amount / zoom ** this.exponent,
        this.mapsPoint[1],
      ];
    }
  }
  /**
   *  Handles right from a Opad.
   *
   * @param {number} zoom
   * @return {Position}
   * @memberof HandleOpad
   */
  handleRight(zoom: number): Position {
    if (zoom >= this.phaseOne.breakPoint) {
      return [
        this.mapsPoint[0] + this.phaseOne.amount / zoom ** this.exponent,
        this.mapsPoint[1],
      ];
    } else if (zoom >= this.phaseTwo.breakPoint) {
      return [
        this.mapsPoint[0] + this.phaseTwo.amount / zoom ** this.exponent,
        this.mapsPoint[1],
      ];
    } else {
      return [
        this.mapsPoint[0] + this.phaseThree.amount / zoom ** this.exponent,
        this.mapsPoint[1],
      ];
    }
  }
  /**
   *  Handles down from a Opad.
   *
   * @param {number} zoom
   * @return {Position}
   * @memberof HandleOpad
   */
  handleDown(zoom: number): Position {
    if (zoom >= this.phaseOne.breakPoint) {
      return [
        this.mapsPoint[0],
        this.mapsPoint[1] - this.phaseOne.amount / zoom ** this.exponent,
      ];
    } else if (zoom >= this.phaseTwo.breakPoint) {
      return [
        this.mapsPoint[0],
        this.mapsPoint[1] - this.phaseTwo.amount / zoom ** this.exponent,
      ];
    } else {
      return [
        this.mapsPoint[0],
        this.mapsPoint[1] - this.phaseThree.amount / zoom ** this.exponent,
      ];
    }
  }
}

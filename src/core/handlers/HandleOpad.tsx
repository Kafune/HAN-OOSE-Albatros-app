import {Position} from 'geojson';

/**
 * In this class is chosen to not inlude zoom because it changes to many times. Due to that, it has become a parameter
 */
export class HandleOpad {
  PHASE_ONE = {breakPoint: 16, amount: 0.25};
  PHASE_TWO = {breakPoint: 12, amount: 0.7};
  PHASE_THREE = {breakPoint: -1, amount: 1.5};
  mapsPoint: Position;
  EXPONENT: number = 3;

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
    if (zoom >= this.PHASE_ONE.breakPoint) {
      return [
        this.mapsPoint[0],
        this.mapsPoint[1] + this.PHASE_ONE.amount / zoom ** this.EXPONENT,
      ];
    } else if (zoom >= this.PHASE_TWO.breakPoint) {
      return [
        this.mapsPoint[0],
        this.mapsPoint[1] + this.PHASE_TWO.amount / zoom ** this.EXPONENT,
      ];
    } else {
      return [
        this.mapsPoint[0],
        this.mapsPoint[1] + this.PHASE_THREE.amount / zoom ** this.EXPONENT,
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
    if (zoom >= this.PHASE_ONE.breakPoint) {
      return [
        this.mapsPoint[0] - this.PHASE_ONE.amount / zoom ** this.EXPONENT,
        this.mapsPoint[1],
      ];
    } else if (zoom >= this.PHASE_TWO.breakPoint) {
      return [
        this.mapsPoint[0] - this.PHASE_TWO.amount / zoom ** this.EXPONENT,
        this.mapsPoint[1],
      ];
    } else {
      return [
        this.mapsPoint[0] - this.PHASE_THREE.amount / zoom ** this.EXPONENT,
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
    if (zoom >= this.PHASE_ONE.breakPoint) {
      return [
        this.mapsPoint[0] + this.PHASE_ONE.amount / zoom ** this.EXPONENT,
        this.mapsPoint[1],
      ];
    } else if (zoom >= this.PHASE_TWO.breakPoint) {
      return [
        this.mapsPoint[0] + this.PHASE_TWO.amount / zoom ** this.EXPONENT,
        this.mapsPoint[1],
      ];
    } else {
      return [
        this.mapsPoint[0] + this.PHASE_THREE.amount / zoom ** this.EXPONENT,
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
    if (zoom >= this.PHASE_ONE.breakPoint) {
      return [
        this.mapsPoint[0],
        this.mapsPoint[1] - this.PHASE_ONE.amount / zoom ** this.EXPONENT,
      ];
    } else if (zoom >= this.PHASE_TWO.breakPoint) {
      return [
        this.mapsPoint[0],
        this.mapsPoint[1] - this.PHASE_TWO.amount / zoom ** this.EXPONENT,
      ];
    } else {
      return [
        this.mapsPoint[0],
        this.mapsPoint[1] - this.PHASE_THREE.amount / zoom ** this.EXPONENT,
      ];
    }
  }
}

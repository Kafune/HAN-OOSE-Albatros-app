import {ISegment} from '../interface/ISegment';
import {ICoordinate} from '../interface/ICoordinate';
import {Calculator} from './Calculator';

export class Route {
  name: string;
  kilometers: number;
  description: string;
  segments: ISegment[];

  /**
   * Constructs the Route.
   * @param {string} name
   * @param {number} kilometers
   * @param {string} description
   * @param {ISegment[]} segments
   */
  constructor(
    name: string,
    kilometers: number,
    description: string,
    segments: ISegment[],
  ) {
    this.name = name;
    this.kilometers = kilometers;
    this.description = description;
    this.segments = segments;
  }

  /**
   * Get's the very first coordinates from the route.
   * @returns {ICoordinate}
   */
  getStartCoordinates(): ICoordinate {
    const array = require('lodash/array');
    return array.first(this.segments)?.start;
  }

  /**
   * Get's the very last coordinates from the route.
   * @returns {ICoordinate}
   */
  getEndCoordinates(): ICoordinate {
    const array = require('lodash/array');
    return array.last(this.segments)?.end;
  }

  /**
   * Calculates the middle points of the route based on begin and start.
   * @returns {number[]}
   */
  getMiddlePoint(): number[] {
    let startLongitude = this.getStartCoordinates().longitude,
      startLatitude = this.getStartCoordinates().latitude,
      endLongitude = this.getEndCoordinates().longitude,
      endLatitude = this.getEndCoordinates().latitude;

    const longitudeDifference = Calculator.toRadians(
      endLongitude - startLongitude,
    );

    startLatitude = Calculator.toRadians(startLatitude);
    endLatitude = Calculator.toRadians(endLatitude);
    startLongitude = Calculator.toRadians(startLongitude);

    const bX = Math.cos(endLatitude) * Math.cos(longitudeDifference);
    const bY = Math.cos(endLatitude) * Math.sin(longitudeDifference);

    const averageLatitude = Math.atan2(
      Math.sin(startLatitude) + Math.sin(endLatitude),
      Math.sqrt(
        (Math.cos(startLatitude) + bX) * (Math.cos(startLatitude) + bX) +
          bY * bY,
      ),
    );
    const averageLongitude =
      startLongitude + Math.atan2(bY, Math.cos(startLatitude) + bX);

    return [
      Calculator.toDegrees(averageLongitude),
      Calculator.toDegrees(averageLatitude),
    ];
  }
}

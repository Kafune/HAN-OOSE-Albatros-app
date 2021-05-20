import { Calculator } from '../helpers/Calculator';
import { Coordinate } from './Coordinate';
import {Segment} from './Segment';
import {IPointStrategy} from './strategys/IPointStrategy';
import {PointStrategyNormal} from './strategys/PointStrategyNormal';

export class Activity {
  activityId: number;
  routeId: number;
  userId: number;
  point: number;
  duration: number;
  distance: number;
  segments: Segment[];
  private _PointStrategy: IPointStrategy = new PointStrategyNormal();

  /**
   * Creates an instance of Activity.
   * @param {number} activityId
   * @param {number} routeId
   * @param {number} userId
   * @param {number} point
   * @param {number} duration
   * @param {number} distance
   * @param {Segment[]} segments
   * @memberof Activity
   */
  constructor(
    activityId: number,
    routeId: number,
    userId: number,
    point: number,
    duration: number,
    distance: number,
    segments: Segment[],
  ) {
    this.activityId = activityId;
    this.routeId = routeId;
    this.userId = userId;
    this.point = point;
    this.duration = duration;
    this.distance = distance;
    this.segments = segments;
  }

  /**
   * gets pointStrategy
   *
   * @type {IPointStrategy}
   * @memberof Activity
   */
  public get PointStrategy(): IPointStrategy {
    return this._PointStrategy;
  }
  /**
   * sets PointStrategy
   *
   * @memberof Activity
   */
  public set PointStrategy(value: IPointStrategy) {
    this._PointStrategy = value;
  }

  /**
   * Get's the very first coordinates from the route.
   * @returns {Coordinate}
   */
  get startCoordinates(): Coordinate {
    const array = require('lodash/array');
    return array.first(this.segments)?.start;
  }

  /**
   * Get's the very last coordinates from the route.
   * @returns {Coordinate}
   */
  get endCoordinates(): Coordinate {
    const array = require('lodash/array');
    return array.last(this.segments)?.end;
  }

  /**
   * Calculates the zoom level based on start and end difference.
   * @returns {number}
   */
  get zoomLevel(): number {
    const startDiff =
      this.startCoordinates.longitude - this.startCoordinates.latitude;
    const endDiff =
      this.endCoordinates.longitude - this.endCoordinates.latitude;

    return Math.abs(startDiff + endDiff / 2) / 5;
  }

  /**
   * Calculates the middle points of the route based on begin and start.
   * @returns {number[]}
   */
  get middlePoint(): number[] {
    let startLongitude = this.startCoordinates.longitude,
      startLatitude = this.startCoordinates.latitude,
      endLongitude = this.endCoordinates.longitude,
      endLatitude = this.endCoordinates.latitude;

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

  /**
   * calculates the point and assines them.
   *
   * @memberof Activity
   */
  calculatePoints(): void {
    this.point = this._PointStrategy.calculate(this.duration, this.distance);
  }
}

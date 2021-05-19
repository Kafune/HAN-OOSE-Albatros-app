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
   * calculates the point and assines them.
   *
   * @memberof Activity
   */
  calculatePoints(): void {
    this.point = this._PointStrategy.calculate(this.duration, this.distance);
  }
}

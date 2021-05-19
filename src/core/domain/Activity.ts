import {Segment} from './Segment';

export class Activity {
  activityId: number;
  routeId: number;
  userId: number;
  point: number;
  duration: number;
  distance: number;
  segments: Segment[];

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
}

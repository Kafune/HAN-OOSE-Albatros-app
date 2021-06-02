import {Activity} from '../domain/Activity';
import {ActivityDTO} from '../dto/ActivityDTO';
import {SegmentMapper} from './SegmentMapper';
import {Route} from '../domain/Route';
export class ActivityMapper {
  /**
   * Maps an activity to an activityDTO.
   * @param {Activity} activity
   */
  static toDTO(activity: Activity) {
    const dto: ActivityDTO = {
      routeId: activity.routeId,
      userId: activity.userId,
      point: Number(activity.point.toFixed(0)),
      duration: activity.duration,
      distance: Number(activity.distance.toFixed(2)),
      segments: SegmentMapper.multipleToDTO(activity.segments),
    };

    return dto;
  }

  /**
   * Needs a activity and maps it to a Route
   *
   * @static
   * @param {Activity} activity
   * @return {Route}
   * @memberof ActivityMapper
   */
  static activityToRoute(activity: Activity): Route {
    return new Route(
      activity.activityId,
      '-1',
      Number(activity.distance.toFixed(0)),
      '-1',
      activity.segments,
    );
  }

  /**
   * Maps a response to a domain.
   *
   * @static
   * @param {ActivityDTO} activity
   * @returns {Activity}
   * @memberof ActivityMapper
   */
  static toDomain(activity: ActivityDTO): Activity {
    return new Activity(
      activity.activityId,
      activity.routeId,
      activity.userId,
      Number(activity.point),
      activity.duration,
      Number(activity.distance),
      [],
    );
  }

  /**
   * Maps multiple responses to a domain.
   * @param {ActivityDTO[]} activities
   * @returns {Activity[]}
   * @memberof ActivityMapper
   */
  static multipleToDomain(activities: ActivityDTO[]): Activity[] {
    return activities.map(activity => this.toDomain(activity));
  }
}

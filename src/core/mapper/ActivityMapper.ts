import {Activity} from '../domain/Activity';
import {ActivityDTO} from '../dto/ActivityDTO';
import {SegmentMapper} from './SegmentMapper';

export class ActivityMapper {
  /**
   * Maps an activity to an activityDTO.
   * @param {Activity} activity
   */
  static toDTO(activity: Activity) {
    const activityDTO: ActivityDTO = {
      routeId: activity.routeId,
      userId: activity.userId,
      point: activity.point,
      duration: activity.duration,
      distance: activity.distance,
      segments: SegmentMapper.multipleToDTO(activity.segments),
    };

    return activityDTO;
  }
}

import {Activity} from '../domain/Activity';
import {ActivityDTO} from '../dto/ActivityDTO';
import {SegmentMapper} from './SegmentMapper';

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
}

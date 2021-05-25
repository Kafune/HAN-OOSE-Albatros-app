import {MapsLine} from '../maps/MapsLine';
import {Activity} from '../domain/Activity';
import {Segment} from '../domain/Segment';
import {MapsCoordinate} from '../maps/MapsCoordinate';

export class MapsLineMapper {
  /**
   * mapsLine To Activity domain converter.
   *
   * @static
   * @param {MapsLine} mapsLine
   * @return {Activity}
   * @memberof RouteMapper
   */
  static mapsLineToActivity(mapsLine: MapsLine): Activity {
    let distance = mapsLine.getTotalKm();
    let segments: Segment[] = [];
    let old: MapsCoordinate;
    let first: boolean = true;
    mapsLine.coordinates.forEach(element => {
      if (first) {
        first = false;
      } else {
        segments.push({
          id: -1,
          start: {
            latitude: old.latitude,
            longitude: old.longitude,
            altitude: -1,
          },
          end: {
            latitude: element.latitude,
            longitude: element.longitude,
            altitude: -1,
          },
        });
      }

      old = element;
    });

    return new Activity(-1, -1, -1, -1, -1, distance, segments);
  }
}

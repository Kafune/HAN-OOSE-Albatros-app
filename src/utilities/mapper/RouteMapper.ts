import {Route} from '../class/Route';
import {MapsCoordinate} from '../class/MapsCoordinate';
import {MapsPoint} from '../class/MapsPoints';
import {MapsLine} from '../class/MapsLine';
import {ISegment} from '../interface/ISegment';

export class RouteMapper {
  /**
   * Maps a route to a usable MapsLine for the maps provider.
   * @param {Route} route
   * @returns {MapsLine}
   */
  static toMapsLine(route: Route): MapsLine {
    return new MapsLine(
      route.segments.map((segment: ISegment) => {
        return new MapsCoordinate(
          segment.start.longitude,
          segment.start.latitude,
        );
      }),
    );
  }

  /**
   * Maps a route to usable MapsPoint for the maps provider.
   * @param {Route} route
   * @returns {MapsPoint}
   */
  static toMapsPoint(route: Route): MapsPoint {
    return new MapsPoint([
      new MapsCoordinate(
        route.getStartCoordinates().longitude,
        route.getStartCoordinates().latitude,
      ),
      new MapsCoordinate(
        route.getEndCoordinates().longitude,
        route.getEndCoordinates().latitude,
      ),
    ]);
  }
}

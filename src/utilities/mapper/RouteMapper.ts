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
    const startPoints = route.segments.map((segment: ISegment) => {
      return new MapsCoordinate(
        segment.start.longitude,
        segment.start.latitude,
      );
    });

    const endPoint = new MapsCoordinate(
      route.endCoordinates.longitude,
      route.endCoordinates.latitude,
    );

    return new MapsLine([...startPoints, endPoint]);
  }

  /**
   * Maps a route to usable MapsPoint for the maps provider.
   * @param {Route} route
   * @returns {MapsPoint}
   */
  static toMapsPoint(route: Route): MapsPoint {
    return new MapsPoint([
      new MapsCoordinate(
        route.startCoordinates.longitude,
        route.startCoordinates.latitude,
      ),
      new MapsCoordinate(
        route.endCoordinates.longitude,
        route.endCoordinates.latitude,
      ),
    ]);
  }
}

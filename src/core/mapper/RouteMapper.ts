import {Route} from '../domain/Route';
import {MapsCoordinate} from '../maps/MapsCoordinate';
import {MapsPoint} from '../maps/MapsPoints';
import {MapsLine} from '../maps/MapsLine';
import {Segment} from '../domain/Segment';

export class RouteMapper {
  /**
   * Maps a route to a usable MapsLine for the maps provider.
   * @param {Route} route
   * @returns {MapsLine}
   */
  static toMapsLine(route: Route): MapsLine {
    const startPoints = route.segments.map((segment: Segment) => {
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

import {Route} from '../domain/Route';
import {MapsCoordinate} from '../maps/MapsCoordinate';
import {MapsPoint} from '../maps/MapsPoints';
import {MapsLine} from '../maps/MapsLine';
import RouteResponseDTO from '../dto/RouteResponseDTO';
import {Activity} from '../domain/Activity';
import {Segment} from '../domain/Segment';

export class RouteMapper {
  /**
   * Maps a route to a usable MapsLine for the maps provider.
   * @param {Route} route
   * @returns {MapsLine}
   */
  static toMapsLine(route: Route): MapsLine {
    const startPoints = route.segments.map(segment => {
      return new MapsCoordinate(
        segment.start.longitude,
        segment.start.latitude,
      );
    });

    const endPoint = new MapsCoordinate(
      route.segments[route.segments.length - 1].end.longitude,
      route.segments[route.segments.length - 1].end.latitude,
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

  /**
   * Maps a response to a domain.
   * @param {RouteResponseDTO} route
   * @returns {Route}
   */
  static toDomain(route: RouteResponseDTO): Route {
    return new Route(
      route.routeId,
      route.name,
      route.distance,
      route.description,
      [],
    );
  }

  /**
   * Maps multiple responses to a domain.
   * @param {RouteResponseDTO[]} routes
   * @returns {Route}
   */
  static multipleToDomain(routes: RouteResponseDTO[]): Route[] {
    return routes.map(route => this.toDomain(route));
  }

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

import {Route} from '../domain/Route';
import api from '../data/api';
import {RouteMapper} from '../mapper/RouteMapper';
import {Segment} from '../domain/Segment';
import {SegmentMapper} from '../mapper/SegmentMapper';

export class RouteController {
  /**
   * Fetches an index of all the Routes.
   * @returns {Promise<Route[]>}
   */
  static async index(token: number): Promise<Route[]> {
    let routes: Route[] = await fetch(
      `${api.baseUrl}/routes?token=${token}`,
      api.headersGet,
    )
      .then(fetchedRoutes => fetchedRoutes.json())
      .then(fetchedRoutes => RouteMapper.multipleToDomain(fetchedRoutes));

    for (const route of routes) {
      route.segments = await this.getSegments(route.id, token);
    }

    return routes;
  }

  /**
   * Fetches all the segments that belong to a route based on the route ID.
   * @param {number} routeId
   * @returns {Promise<Segment[]>}
   */
  static async getSegments(routeId: number, token: number): Promise<Segment[]> {
    return await fetch(
      `${api.baseUrl}/segments/${routeId}?token=${token}`,
      api.headersGet,
    )
      .then(segments => segments.json())
      .then(segments => SegmentMapper.multipleToDomain(segments));
  }
}

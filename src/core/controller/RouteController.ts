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
  static async index(): Promise<Route[]> {
    let routes: Route[] = await fetch(`${api.baseUrl}/routes`, api.headersGet)
      .then(fetchedRoutes => fetchedRoutes.json())
      .then(fetchedRoutes => RouteMapper.multipleToDomain(fetchedRoutes));

    for (const route of routes) {
      route.segments = await this.getSegments(route.id);
    }

    return routes;
  }

  /**
   * Fetches all the segments that belong to a route based on the route ID.
   * @param {number} routeId
   * @returns {Promise<Segment[]>}
   */
  static async getSegments(routeId: number): Promise<Segment[]> {
    return await fetch(`${api.baseUrl}/segments/${routeId}`, api.headersGet)
      .then(segments => segments.json())
      .then(segments => SegmentMapper.multipleToDomain(segments));
  }
}

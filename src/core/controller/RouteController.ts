import {Route} from '../domain/Route';
import api from '../data/api';
import {RouteMapper} from '../mapper/RouteMapper';
import {Segment} from '../domain/Segment';
import {SegmentMapper} from '../mapper/SegmentMapper';

export class RouteController {
  /**
   * Get's all the routes from the TomEE API.
   * @returns {Promise<Route[]>}
   */
  static async index(): Promise<Route[]> {
    let routes: Route[] = await fetch(`${api.baseUrl}/routes`, api.headers)
      .then(fetchedRoutes => fetchedRoutes.json())
      .then(fetchedRoutes => RouteMapper.multipleToDomain(fetchedRoutes));

    for (const route of routes) {
      route.segments = await this.getSegments(route.id);
    }

    return routes;
  }

  /**
   * Get's all the segments from the TomEE API based on the route id.
   * @param {number} routeId
   * @returns {Promise<Segment[]>}
   */
  static async getSegments(routeId: number): Promise<Segment[]> {
    return await fetch(`${api.baseUrl}/segments/${routeId}`, api.headers)
      .then(segments => segments.json())
      .then(segments => SegmentMapper.multipleToDomain(segments));
  }
}

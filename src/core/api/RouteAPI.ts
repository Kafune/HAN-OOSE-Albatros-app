import {Route} from '../domain/Route';
import api from '../data/api';
import {SegmentAPI} from './SegmentAPI';
import {RouteMapper} from '../mapper/RouteMapper';

export class RouteAPI {
  /**
   * Get's all the routes from the TomEE API.
   * @returns {Promise<Route[]>}
   */
  static async getRoutes(): Promise<Route[]> {
    let routes: Route[] = await fetch(`${api.baseUrl}/routes`, api.headers)
      .then(fetchedRoutes => fetchedRoutes.json())
      .then(fetchedRoutes => RouteMapper.multipleToDomain(fetchedRoutes));

    for (const route of routes) {
      route.segments = await SegmentAPI.getSegments(route.id);
    }

    return routes;
  }
}

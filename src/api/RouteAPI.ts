import {Route} from '../core/domain/Route';
import RouteResponseDTO from '../core/dto/RouteResponseDTO';
import headers from '../core/data/headers';

export class RouteAPI {
  /**
   * Get's all the routes from the TomEE API.
   * @returns {Promise<Route[]>}
   */
  static getRoutes(): Promise<Route[]> {
    return fetch('http://10.0.2.2:8080/Run_connect_war/api/routes', headers)
      .then(response => response.json())
      .then((response: any) => {
        return response.map((res: RouteResponseDTO) => {
          return new Route(res.name, res.distance, 'Dummy', []);
        });
      });

    // return [
    //   new Route(
    //     'Route 1',
    //     16,
    //     'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aperiam dolorem doloribus est exercitationem expedita fuga incidunt ipsum magnam, natus officiis provident quas quibusdam quod, rem repellat suscipit unde veniam?',
    //     [
    //       {
    //         id: 1,
    //         start: {latitude: 52.037866, longitude: 5.668217, altitude: 1},
    //         end: {latitude: 52.042665, longitude: 5.668078, altitude: 1},
    //         poi: {id: 1, description: 'POI', name: 'name'},
    //       },
    //     ],
    //   ),
    //   new Route(
    //     'Route 2',
    //     12,
    //     'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aperiam dolorem doloribus est exercitationem expedita fuga incidunt ipsum magnam, natus officiis provident quas quibusdam quod, rem repellat suscipit unde veniam?',
    //     [
    //       {
    //         id: 1,
    //         start: {latitude: 51.037866, longitude: 5.668217, altitude: 1},
    //         end: {latitude: 51.042665, longitude: 5.668078, altitude: 1},
    //         poi: {id: 1, description: 'POI', name: 'name'},
    //       },
    //     ],
    //   ),
    //   new Route(
    //     'Route 3',
    //     8,
    //     'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aperiam dolorem doloribus est exercitationem expedita fuga incidunt ipsum magnam, natus officiis provident quas quibusdam quod, rem repellat suscipit unde veniam?',
    //     [
    //       {
    //         id: 1,
    //         start: {latitude: 49.037866, longitude: 5.668217, altitude: 1},
    //         end: {latitude: 49.042665, longitude: 5.668078, altitude: 1},
    //         poi: {id: 1, description: 'POI', name: 'name'},
    //       },
    //     ],
    //   ),
    // ];
  }
}

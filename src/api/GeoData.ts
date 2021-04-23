import {Route} from '../core/domain/Route';

export default class GeoData {
    static getGeoData(): Route[] {
        return [
            new Route(
                'Route 1',
                16,
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aperiam dolorem doloribus est exercitationem expedita fuga incidunt ipsum magnam, natus officiis provident quas quibusdam quod, rem repellat suscipit unde veniam?',
                [
                  {
                    id: 1,
                    start: {latitude: 52.04404681240675, longitude: 5.64457560248722, altitude: 1},
                    end: {latitude: 52.04411939947858, longitude: 5.648062474218552, altitude: 1},
                    poi: {id: 1, description: 'Dit is een point of interest', name: 'testPOI'},
                  },
                  {
                    id: 2,
                    start: {latitude: 51.037866, longitude: 5.668217, altitude: 1},
                    end: {latitude: 51.042665, longitude: 5.668078, altitude: 1},
                    poi: {id: 1, description: 'Testpunt 2', name: 'naam'},
                  }
                ],
              ),
        ]
    }
}
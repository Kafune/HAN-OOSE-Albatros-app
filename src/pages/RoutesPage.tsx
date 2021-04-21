import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';
import Maps from '../components/Maps';
import RouteInformation from '../components/RouteInformation';
import {MapsLine} from '../utilities/class/MapsLine';
import {MapsCoordinate} from '../utilities/class/MapsCoordinate';
import {MapsPoint} from '../utilities/class/MapsPoints';
import {Route} from '../utilities/class/Route';

const RoutesPage: React.FC = (): JSX.Element => {
  const [geoJSON, setGeoJSON] = useState<MapsLine>(
    new MapsLine([
      new MapsCoordinate(5.674306, 52.030944),
      new MapsCoordinate(5.675282, 52.030033),
      new MapsCoordinate(5.679166, 52.030257),
      new MapsCoordinate(5.679166, 52.033257),
      new MapsCoordinate(5.679981, 52.034237),
    ]),
  );

  const [mapPoints, setMapPoints] = useState<MapsPoint>(
    new MapsPoint([
      new MapsCoordinate(5.674306, 52.030944),
      new MapsCoordinate(5.679981, 52.034237),
    ]),
  );

  const [center, setCenter] = useState<number[]>([5.679166, 52.030257]);

  return (
    <ScrollView>
      <Maps geoJSON={geoJSON} mapPoints={mapPoints} center={center} zoom={13} />
      <Text style={styles.routesTitle}>Kies een route</Text>
      {getRoutes().length > 0 &&
        getRoutes().map((route: Route) => (
          <RouteInformation
            key={route.name}
            route={route}
            setGeoJSON={setGeoJSON}
            setMapPoints={setMapPoints}
            setCenter={setCenter}
          />
        ))}
    </ScrollView>
  );
};

const getRoutes: Function = (): Route[] => {
  // TODO: Gather data from back-end API instead of dummy data.
  return [
    new Route(
      'Route 1',
      16,
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aperiam dolorem doloribus est exercitationem expedita fuga incidunt ipsum magnam, natus officiis provident quas quibusdam quod, rem repellat suscipit unde veniam?',
      [
        {
          id: 1,
          start: {latitude: 52.037866, longitude: 5.668217, altitude: 1},
          end: {latitude: 52.042665, longitude: 5.668078, altitude: 1},
          poi: {id: 1, description: 'POI', name: 'name'},
        },
      ],
    ),
    new Route(
      'Route 2',
      12,
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aperiam dolorem doloribus est exercitationem expedita fuga incidunt ipsum magnam, natus officiis provident quas quibusdam quod, rem repellat suscipit unde veniam?',
      [
        {
          id: 1,
          start: {latitude: 51.037866, longitude: 5.668217, altitude: 1},
          end: {latitude: 51.042665, longitude: 5.668078, altitude: 1},
          poi: {id: 1, description: 'POI', name: 'name'},
        },
      ],
    ),
    new Route(
      'Route 3',
      8,
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aperiam dolorem doloribus est exercitationem expedita fuga incidunt ipsum magnam, natus officiis provident quas quibusdam quod, rem repellat suscipit unde veniam?',
      [
        {
          id: 1,
          start: {latitude: 49.037866, longitude: 5.668217, altitude: 1},
          end: {latitude: 49.042665, longitude: 5.668078, altitude: 1},
          poi: {id: 1, description: 'POI', name: 'name'},
        },
      ],
    ),
  ];
};

const styles = StyleSheet.create({
  routesTitle: {
    textAlign: 'center',
    marginVertical: 18,
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default RoutesPage;

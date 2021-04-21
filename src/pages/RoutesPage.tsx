import React from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';
import Maps from '../components/Maps';
import RouteInformation from '../components/RouteInformation';
import {MapsLine} from '../utilities/class/MapsLine';
import {MapsCoordinate} from '../utilities/class/MapsCoordinate';
import {MapsPoint} from '../utilities/class/MapsPoints';
import {Route} from '../utilities/interface/Route';

const RoutesPage: React.FC = (): JSX.Element => {
  // Dummy data for base geoJSON.
  const geoJSON = new MapsLine([
    new MapsCoordinate(5.674306, 52.030944),
    new MapsCoordinate(5.675282, 52.030033),
    new MapsCoordinate(5.679166, 52.030257),
    new MapsCoordinate(5.679166, 52.033257),
    new MapsCoordinate(5.679981, 52.034237),
  ]);

  // Dummy Data for base points.
  const mapPoints = new MapsPoint([
    new MapsCoordinate(5.674306, 52.030944),
    new MapsCoordinate(5.679981, 52.034237),
  ]);

  // Base data for center point
  const center = [5.679166, 52.030257];

  return (
    <ScrollView>
      <Maps geoJSON={geoJSON} mapPoints={mapPoints} center={center} zoom={13} />
      <Text style={styles.routesTitle}>Kies een route</Text>
      {getRoutes().map((route: Route) => (
        <RouteInformation key={route.name} route={route} />
      ))}
    </ScrollView>
  );
};

const getRoutes: Function = (): Route[] => {
  // TODO: Gather data from back-end API.
  return [
    {
      name: 'Route 1',
      kilometers: 16,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aperiam dolorem doloribus est exercitationem expedita fuga incidunt ipsum magnam, natus officiis provident quas quibusdam quod, rem repellat suscipit unde veniam?',
      segments: [
        {
          id: 1,
          start: {longtitude: 1, latitude: 1, altitude: 1},
          end: {longtitude: 1, latitude: 1, altitude: 1},
          poi: {id: 1, description: 'POI', name: 'name'},
        },
      ],
    },
    {
      name: 'Route 2',
      kilometers: 16,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aperiam dolorem doloribus est exercitationem expedita fuga incidunt ipsum magnam, natus officiis provident quas quibusdam quod, rem repellat suscipit unde veniam?',
      segments: [
        {
          id: 1,
          start: {longtitude: 1, latitude: 1, altitude: 1},
          end: {longtitude: 1, latitude: 1, altitude: 1},
          poi: {id: 1, description: 'POI', name: 'name'},
        },
      ],
    },
    {
      name: 'Route 3',
      kilometers: 16,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aperiam dolorem doloribus est exercitationem expedita fuga incidunt ipsum magnam, natus officiis provident quas quibusdam quod, rem repellat suscipit unde veniam?',
      segments: [
        {
          id: 1,
          start: {longtitude: 1, latitude: 1, altitude: 1},
          end: {longtitude: 1, latitude: 1, altitude: 1},
          poi: {id: 1, description: 'POI', name: 'name'},
        },
      ],
    },
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

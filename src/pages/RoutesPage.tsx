import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';
import Maps from '../components/Maps';
import RouteInformation from '../components/RouteInformation';
import {MapsLine} from '../core/maps/MapsLine';
import {MapsPoint} from '../core/maps/MapsPoints';
import {Route} from '../core/domain/Route';
import {RouteMapper} from '../core/mapper/RouteMapper';
import {RouteAPI} from '../api/RouteAPI';

const RoutesPage: () => JSX.Element = (): JSX.Element => {
  const routes = RouteAPI.getRoutes();

  const highlightedRoute: Route = routes[0];

  const [geoJSON, setGeoJSON] = useState<MapsLine>(
    RouteMapper.toMapsLine(highlightedRoute),
  );

  const [mapPoints, setMapPoints] = useState<MapsPoint>(
    RouteMapper.toMapsPoint(highlightedRoute),
  );

  const [center, setCenter] = useState<number[]>(highlightedRoute.middlePoint);

  return (
    <ScrollView>
      <Maps
        mapsLine={geoJSON}
        mapsPoint={mapPoints}
        center={center}
        zoom={13}
      />
      <Text style={styles.routesTitle}>Kies een route</Text>
      {routes.length > 0 &&
        routes.map((route: Route) => (
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

const styles = StyleSheet.create({
  routesTitle: {
    textAlign: 'center',
    marginVertical: 18,
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default RoutesPage;

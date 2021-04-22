import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';
import Maps from '../components/Maps';
import RouteInformation from '../components/RouteInformation';
import {MapsLine} from '../core/maps/MapsLine';
import {MapsPoint} from '../core/maps/MapsPoints';
import {Route} from '../core/domain/Route';
import {RouteMapper} from '../core/mapper/RouteMapper';
import {RouteAPI} from '../core/api/RouteAPI';

const RoutesPage: React.FC = (): JSX.Element => {
  const [routes, setRoutes] = useState<Route[]>();

  const [highlightedRoute, sethighlightedRoute] = useState<Route>();

  useEffect(() => {
    RouteAPI.routes.then((fetchedRoutes: Route[]) => {
      setRoutes(fetchedRoutes);
      sethighlightedRoute(fetchedRoutes[0]);
    });
  }, []);

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
      {routes !== undefined &&
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

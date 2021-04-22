import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';
import Maps from '../components/Maps';
import RouteInformation from '../components/RouteInformation';
import {Route} from '../core/domain/Route';
import {RouteMapper} from '../core/mapper/RouteMapper';
import {RouteAPI} from '../core/api/RouteAPI';

const RoutesPage: React.FC = (): JSX.Element => {
  const [routes, setRoutes] = useState<Route[] | undefined>();
  const [highlightedRoute, setHighlightedRoute] = useState<Route | undefined>();

  useEffect(() => {
    RouteAPI.routes.then((fetchedRoutes: Route[]) => {
      setRoutes(fetchedRoutes);
      // TODO: Fetch route segments to display it without errors.
      setHighlightedRoute(fetchedRoutes[0]);
    });
  }, []);

  return (
    <ScrollView>
      {highlightedRoute !== undefined && (
        <Maps
          mapsLine={RouteMapper.toMapsLine(highlightedRoute)}
          mapsPoint={RouteMapper.toMapsPoint(highlightedRoute)}
          center={highlightedRoute.middlePoint}
          zoom={13}
        />
      )}
      <Text style={styles.routesTitle}>Kies een route</Text>
      {routes !== undefined &&
        routes.map((route: Route) => (
          <RouteInformation
            key={route.name}
            route={route}
            setHighlightedRoute={setHighlightedRoute}
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

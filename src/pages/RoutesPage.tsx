import React, { useEffect, useState } from 'react';
import { Button, View, ScrollView, StyleSheet, Text, Pressable } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Maps from '../components/Maps';
import RouteInformation from '../components/RouteInformation';
import { Route } from '../core/domain/Route';
import { RouteMapper } from '../core/mapper/RouteMapper';
import { RouteController } from '../core/controller/RouteController';
import colors, { brittishPalette } from '../styles/colors';

const RoutesPage: React.FC = (): JSX.Element => {
  const [routes, setRoutes] = useState<Route[] | undefined>();
  const [highlightedRoute, setHighlightedRoute] = useState<Route | undefined>();

  useEffect(() => {
    const fetchRoutes: Function = async (): Promise<void> => {
      const fetchedRoutes = await RouteController.index();
      setRoutes(fetchedRoutes);
      setHighlightedRoute(fetchedRoutes[0]);
    };

    fetchRoutes();
  }, []);

  return (
    <ScrollView>
      {highlightedRoute !== undefined && (
        <Maps
          mapsLine={RouteMapper.toMapsLine(highlightedRoute)}
          mapsPoint={RouteMapper.toMapsPoint(highlightedRoute)}
          center={highlightedRoute.middlePoint}
          zoom={highlightedRoute.zoomLevel}
        />
      )}
      <Text style={styles.routesTitle}>Kies een route</Text>
      {routes !== undefined &&
        routes.map(route => (
          <RouteInformation
            isActive={route.id === highlightedRoute?.id}
            key={route.id}
            route={route}
            setHighlightedRoute={setHighlightedRoute}
          />
        ))}
      <View
        style={[styles.boxIs8, styles.button]}>
        <Pressable
          onPress={() => console.log("Test knop")}
          style={styles.buttonInner}>
          <MaterialCommunityIcons
            name="map-marker"
            size={30}
            color={brittishPalette.white}
          />
          <Text style={styles.buttonText}>Kies route.</Text>
        </Pressable>
      </View>
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
  button: {
    backgroundColor: colors.main,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    borderRadius: 5,
    padding: 8,
    margin: 10
  },
  buttonInner: {
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  buttonText: {
    paddingTop: 2,
    fontSize: 18,
    color: brittishPalette.white,
    fontWeight: 'bold',
  },
  boxIs8: {
    minWidth: '80%',
  },
});

export default RoutesPage;

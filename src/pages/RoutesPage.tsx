import React, { useEffect, useState } from 'react';
import { Button, View, ScrollView, StyleSheet, Text, Pressable } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Maps from '../components/Maps';
import RouteInformation from '../components/RouteInformation';
import { Route } from '../core/domain/Route';
import { RouteMapper } from '../core/mapper/RouteMapper';
import { RouteController } from '../core/controller/RouteController';
import colors, { brittishPalette } from '../styles/colors';
import Dialog from 'react-native-dialog';

const RoutesPage: React.FC = (): JSX.Element => {
  const [routes, setRoutes] = useState<Route[] | undefined>();
  const [highlightedRoute, setHighlightedRoute] = useState<Route | undefined>();
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const fetchRoutes: Function = async (): Promise<void> => {
      const fetchedRoutes = await RouteController.index();
      setRoutes(fetchedRoutes);
      setHighlightedRoute(fetchedRoutes[0]);
    };


    fetchRoutes();
  }, []);

  const toggleRouteDialog = () => {
    setShowConfirmation(!showConfirmation);
  };

  const startActivity = () => {
    console.log(highlightedRoute);
  };

  return (
    <View>
      <View style={{ zIndex: 10, height: "25%" }}>
        {highlightedRoute !== undefined && (
          <Maps
            mapsLine={RouteMapper.toMapsLine(highlightedRoute)}
            mapsPoint={RouteMapper.toMapsPoint(highlightedRoute)}
            center={highlightedRoute.middlePoint}
            zoom={highlightedRoute.zoomLevel}
          />
        )}
        <View
          style={[styles.boxIs8, styles.button]}>
          <Pressable
            onPress={() => toggleRouteDialog()}
            style={styles.buttonInner}>
            <MaterialCommunityIcons
              name="arrow-right-circle"
              size={30}
              color={brittishPalette.white}
            />
            <Text style={styles.buttonText}>Kies route</Text>
          </Pressable>
        </View>
      </View>
      <ScrollView>
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
      </ScrollView>
      <View>
        <Dialog.Container visible={showConfirmation}>
          <Dialog.Title>Weet je zeker dat je deze route wilt lopen?</Dialog.Title>
          <Dialog.Description>Route: {highlightedRoute?.name + "\n"}
                              Afstand: {highlightedRoute?.distance + "\n"}
                              Beschrijving: {highlightedRoute?.description + "\n"} </Dialog.Description>
          <Dialog.Button label="Nee" onPress={() => toggleRouteDialog()} />
          <Dialog.Button
            label="Ja"
            onPress={() =>
              startActivity()
            }
          />
        </Dialog.Container>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  routesTitle: {
    textAlign: 'center',
    marginBottom: 18,
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
    marginHorizontal: 10,
    marginBottom: 10,

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
    marginLeft: 5,
  },
  boxIs8: {
    minWidth: '80%',
  },
});

export default RoutesPage;



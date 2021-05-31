import React, {useEffect, useState} from 'react';
import {View, ScrollView, StyleSheet, Text, Pressable} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Maps from '../components/Maps';
import RouteInformation from '../components/RouteInformation';
import {Route} from '../core/domain/Route';
import {RouteMapper} from '../core/mapper/RouteMapper';
import {RouteController} from '../core/controller/RouteController';
import colors, {brittishPalette} from '../styles/colors';
import Dialog from 'react-native-dialog';
import {useDispatch} from 'react-redux';
import {setStoreRouteLine} from '../core/redux/actions/routeLineActions';

type props = {
  navigation: {navigate: (arg0: string) => void};
};

const RoutesPage: React.FC<props> = (props): JSX.Element => {
  const dispatch = useDispatch();
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
    dispatch(setStoreRouteLine(highlightedRoute));
    props.navigation.navigate('Record');
  };

  return (
    <View>
      <View style={[styles.map]}>
        {highlightedRoute !== undefined && (
          <Maps
            mapsLine={RouteMapper.toMapsLine(highlightedRoute)}
            mapsPoint={RouteMapper.toMapsPoint(highlightedRoute)}
            center={highlightedRoute.middlePoint}
            zoom={highlightedRoute.zoomLevel}
          />
        )}
      </View>
      <View style={[styles.boxIs8, styles.button]}>
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
      <ScrollView>
        <Text style={styles.routesTitle}>Kies een route</Text>
        {routes !== undefined &&
          routes.map(route => (
            <RouteInformation
              isActive={route.id === highlightedRoute?.id}
              key={route.id}
              route={route}
              onSelectRoute={setHighlightedRoute}
            />
          ))}
      </ScrollView>
      <View>
        <Dialog.Container visible={showConfirmation}>
          <Dialog.Title>
            Weet je zeker dat je deze route wilt lopen?
          </Dialog.Title>
          <Dialog.Description>
            Route: {highlightedRoute?.name + '\n'}
            Afstand: {highlightedRoute?.distance + ' km' + '\n'}
            Beschrijving: {highlightedRoute?.description + '\n'}{' '}
          </Dialog.Description>
          <Dialog.Button label="Nee" onPress={() => toggleRouteDialog()} />
          <Dialog.Button label="Ja" onPress={() => startActivity()} />
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
    margin: 10,
    marginTop: 25,
  },
  map: {
    zIndex: 10,
    height: 220,
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

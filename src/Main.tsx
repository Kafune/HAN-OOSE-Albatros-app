import React, {FC} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {NativeRouter, Route, Link} from 'react-router-native';
import MapsPage from './pages/MapPage';
import RoutesPage from './pages/RoutesPage';
C
const Main: FC = () => {
  return (
    <NativeRouter>
      <View style={Styles.nav}>
        <Link to="maps-demo">
          <Text>Maps demo</Text>
        </Link>
        <Link to="routes">
          <Text>Route kiezen</Text>
        </Link>
      </View>
      <Route path="/maps-demo" component={MapsPage} />
      <Route path="/routes" component={RoutesPage} />
    </NativeRouter>
  );
};

const Styles = StyleSheet.create({
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 32,
  },
});

export default Main;

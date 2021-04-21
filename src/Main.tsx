import React, {FC} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {NativeRouter, Route, Link} from 'react-router-native';
import MapsPage from './pages/MapPage';

function Route1() {
  return <Text>Home</Text>;
}
function Route2() {
  return <Text>Hello World</Text>;
}

const Main: FC = () => {
  return (
    <NativeRouter>
      <View style={Styles.nav}>
        <Link to="/">
          <Text>Route 1</Text>
        </Link>
        <Link to="route2">
          <Text>Route 2</Text>
        </Link>
        <Link to="maps-demo">
          <Text>Maps demo</Text>
        </Link>
      </View>

      <Route exact path="/" component={Route1} />
      <Route path="/route2" component={Route2} />
      <Route path="/maps-demo" component={MapsPage} />
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

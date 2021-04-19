import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {NativeRouter, Route, Link} from 'react-router-native';
import Maps from './components/Maps.js';

const Route1 = () => <Text>Home</Text>;
const Route2 = () => <Text>Hello World</Text>;

const Main = () => {
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
      <Route path="/maps-demo" component={Maps} />
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

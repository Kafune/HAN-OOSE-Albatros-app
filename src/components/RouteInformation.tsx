import React from 'react';
import {Route} from '../utilities/class/Route';
import {Button, Image, StyleSheet, Text, View} from 'react-native';
import {RouteMapper} from '../utilities/mapper/RouteMapper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
  route: Route;
  setGeoJSON: Function;
  setMapPoints: Function;
  setCenter: Function;
}

const RouteInformation: React.FC<Props> = ({
  route,
  setGeoJSON,
  setMapPoints,
  setCenter,
}): JSX.Element => {
  return (
    <View style={styles.wrapper}>
      {/* TODO: Replace dummy image for real image. */}
      <Image
        source={{uri: 'https://reactjs.org/logo-og.png'}}
        style={styles.image}
      />
      <View style={styles.statistics}>
        <Text style={styles.title}>{route.name}</Text>
        <Text style={styles.subtitle}>{route.kilometers} kilometer</Text>
        <Text style={styles.description}>
          {route.description.substring(0, 60)}...
        </Text>
      </View>
      <View style={styles.button}>
        <Button
          onPress={() => {
            setGeoJSON(RouteMapper.toMapsLine(route));
            setMapPoints(RouteMapper.toMapsPoint(route));
            setCenter(route.middlePoint);
          }}
          title="Button"
        />
        <MaterialCommunityIcons name="map" size={12} color={'black'} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
    marginHorizontal: 10,
    overflow: 'hidden',
    borderRadius: 6,
  },
  image: {
    width: 100,
  },
  statistics: {
    width: '60%',
    padding: 10,
    alignSelf: 'center',
  },
  button: {
    width: 'auto',
    alignSelf: 'center',
    alignItems: 'flex-end',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 16,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 5,
  },
  description: {
    fontSize: 12,
  },
});

export default RouteInformation;

import React from 'react';
import {Route} from '../utilities/interface/Route';
import {Button, Image, StyleSheet, Text, View} from 'react-native';
import {MapsLine} from '../utilities/class/MapsLine';
import {MapsCoordinate} from '../utilities/class/MapsCoordinate';
import {MapsPoint} from '../utilities/class/MapsPoints';
import {Segment} from '../utilities/interface/Segment';

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
            setGeoJSON(new MapsLine(toMapsCoordinate(route)));
            setMapPoints(new MapsPoint(getStartAndEndPoints(route)));
            setCenter(
              middlePoint(
                route.segments[0].start.latitude,
                route.segments[0].start.longitude,
                getLast(route.segments).end.latitude,
                getLast(route.segments).end.longitude,
              ),
            );
          }}
          title="Button"
        />
      </View>
    </View>
  );
};

const toMapsCoordinate: Function = (route: Route): MapsCoordinate[] => {
  return route.segments.map(segment => {
    return new MapsCoordinate(segment.start.longitude, segment.start.latitude);
  });
};

const getStartAndEndPoints = (route: Route) => {
  return [
    new MapsCoordinate(
      route.segments[0].start.longitude,
      route.segments[0].start.latitude,
    ),
    new MapsCoordinate(
      getLast(route.segments).start.longitude,
      getLast(route.segments).start.latitude,
    ),
  ];
};

const getLast = (array: Segment[]) => array[array.length - 1];

const toRad = (number: number) => (number * Math.PI) / 180;

const toDeg = (number: number) => number * (180 / Math.PI);

const middlePoint = (
  latitude1: number,
  longitude1: number,
  latitude2: number,
  longitude2: number,
): any => {
  //-- Longitude difference
  const dLng = toRad(longitude2 - longitude1);

  //-- Convert to radians
  latitude1 = toRad(latitude1);
  latitude2 = toRad(latitude2);
  longitude1 = toRad(longitude1);

  const bX = Math.cos(latitude2) * Math.cos(dLng);
  const bY = Math.cos(latitude2) * Math.sin(dLng);
  const lat3 = Math.atan2(
    Math.sin(latitude1) + Math.sin(latitude2),
    Math.sqrt(
      (Math.cos(latitude1) + bX) * (Math.cos(latitude1) + bX) + bY * bY,
    ),
  );
  const lng3 = longitude1 + Math.atan2(bY, Math.cos(latitude1) + bX);

  //-- Return result
  return [toDeg(lng3), toDeg(lat3)];
};

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#E8E8E8',
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

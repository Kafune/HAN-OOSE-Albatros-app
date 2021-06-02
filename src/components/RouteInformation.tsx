import React from 'react';
import {Route} from '../core/domain/Route';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../styles/colors';
import {Activity} from '../core/domain/Activity';
import {Duration} from '../core/maps/Duration';

interface Props {
  route: Route | Activity;
  onSelectRoute: Function;
  isActive: boolean;
}

const RouteInformation: React.FC<Props> = ({
  route,
  onSelectRoute,
  isActive,
}): JSX.Element => {
  const calculateActivitySpeed = (activity: Activity) =>
    (activity.distance / (activity.duration / 1000 / 60 / 60)).toFixed(2);

  return (
    <TouchableOpacity
      disabled={isActive}
      style={[styles.wrapper, isActive ? styles.active : styles.inactive]}
      onPress={() => onSelectRoute(route)}>
      {/* TODO: Replace dummy image for real image. */}
      <Image
        source={{uri: 'https://reactjs.org/logo-og.png'}}
        style={styles.image}
      />
      <View style={styles.statistics}>
        <Text style={styles.title}>
          {route instanceof Route
            ? route.name
            : 'Activiteit ' + route.activityId}
        </Text>
        <Text style={styles.subtitle}>{route.distance} kilometer</Text>
        {route instanceof Route ? (
          <Text style={styles.description}>
            {route.description.substring(0, 60)}...
          </Text>
        ) : (
          <Text style={styles.description}>
            <Text>
              Afstand: {route.distance} km{'\n'}
            </Text>
            <Text>Tijd: {new Duration(route.duration).getHMS() + '\n'}</Text>
            <Text>
              Snelheid: {calculateActivitySpeed(route)} km/u{'\n'}
            </Text>
            <Text>Score: {route.point}</Text>
          </Text>
        )}
      </View>
      <View style={styles.button}>
        <MaterialCommunityIcons
          name="chevron-right"
          size={30}
          color={colors.main}
        />
      </View>
    </TouchableOpacity>
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
    borderWidth: 2,
    borderStyle: 'solid',
  },
  active: {
    borderColor: colors.main,
  },
  inactive: {
    borderColor: '#f0f0f1',
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

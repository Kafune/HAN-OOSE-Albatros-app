import React, {FC, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {useSelector} from 'react-redux';
import Maps from '../components/Maps';
import {RouteMapper} from '../core/mapper/RouteMapper';
import { MapsPoint } from '../core/maps/MapsPoints';

const RecordedActivity: FC = () => {
  const recordedActivityState = useSelector(state => state.walkedRoute);

  useEffect(() => {
    console.log(recordedActivityState);
  }, [recordedActivityState]);

  return (
    <View style={styles.page}>
      <View>
        <Text style={styles.headerText}>Gelopen Route</Text>
      </View>
      <View style={styles.container}>
        <Maps
          mapsPoint={new MapsPoint([])}
          mapsLine={RouteMapper.toMapsLine(recordedActivityState)}
          zoom={14}
          center={recordedActivityState.middlePoint}
        />
      </View>
      <View />
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#F5FCFF',
    height: '100%',
  },
  container: {
    height: 250,
    width: '100%',
    backgroundColor: '#F0F0F1FF',
  },
  headerText: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    paddingVertical: 12,
  },
});

export default RecordedActivity;

import React, {FC, useEffect} from 'react';
import {View, StyleSheet, Text, Pressable} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import Maps from '../components/Maps';
import colors, {brittishPalette} from '../styles/colors';
import {RouteMapper} from '../core/mapper/RouteMapper';
import {MapsPoint} from '../core/maps/MapsPoints';

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

      <View style={styles.activityGrid}>
        <View style={styles.activityItem}>
          <View>
            <Text style={styles.activityHeaderText}>Route Naam:</Text>
            <Text style={styles.activityItemText}>...</Text>
          </View>
          <View>
            <Text style={styles.activityHeaderText}>Afstand:</Text>
            <Text style={styles.activityItemText}>...</Text>
          </View>
        </View>

        <View style={styles.activityItem}>
          <View>
            <Text style={styles.activityHeaderText}>Gelopen Tijd:</Text>
            <Text style={styles.activityItemText}>...</Text>
          </View>
          <View>
            <Text style={styles.activityHeaderText}>Tempo:</Text>
            <Text style={styles.activityItemText}>...</Text>
          </View>
        </View>
      </View>

      <View style={styles.activityGrid}>
        <View style={{...styles.activityItem, ...styles.activityButtonWrapper}}>
          <View style={styles.button}>
            <Pressable
              onPress={() => {
                console.log('pressed');
              }}>
              <MaterialCommunityIcons
                name="delete"
                size={30}
                color={brittishPalette.white}
              />
              <Text style={styles.buttonText}>Verwijderen</Text>
            </Pressable>
          </View>
        </View>
        <View style={{...styles.activityItem, ...styles.activityButtonWrapper}}>
          <View style={styles.button}>
            <Pressable
              onPress={() => {
                console.log('pressed');
              }}>
              <MaterialCommunityIcons
                name="content-save"
                size={30}
                color={brittishPalette.white}
              />
              <Text style={styles.buttonText}>Opslaan</Text>
            </Pressable>
          </View>
        </View>
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
  activityGrid: {
    marginTop: 32,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  activityItem: {
    width: '50%',
  },
  activityHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  activityItemText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 32,
  },
  activityButtonWrapper: {
    textAlign: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: colors.main,
    borderRadius: 5,
    padding: 8,
    marginTop: 25,
    width: 150,
  },
  buttonText: {
    paddingTop: 2,
    fontSize: 18,
    color: brittishPalette.white,
    fontWeight: 'bold',
    marginLeft: 5,
  },
});

export default RecordedActivity;

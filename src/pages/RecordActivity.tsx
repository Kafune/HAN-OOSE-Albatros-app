import React, {FC, useState, useEffect} from 'react';
import {Button, View, Text, StyleSheet, Pressable} from 'react-native';
import TrackMap from '../components/TrackMap';
import {MapsLine} from '../core/maps/MapsLine';
import {MapsCoordinate} from '../core/maps/MapsCoordinate';
import {MapsPoint} from '../core/maps/MapsPoints';
import getLocation from '../core/maps/GetLocation';
import {Error} from '../components/Error';
import colors, {brittishPalette} from '../styles/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const RecordActivity: FC = () => {
  const GPS_INTERVAL = 5000; // get GPS every 5000ms
  const [intervalNr, setIntervalNr] = useState<Number>(0);
  const [tracking, setTracking] = useState<boolean>(true);
  const [route, setRoute] = useState<MapsLine>(
    new MapsLine([
      new MapsCoordinate(5.674306, 52.030944),
      new MapsCoordinate(5.675282, 52.030033),
      new MapsCoordinate(5.679166, 52.030257),
      new MapsCoordinate(5.679166, 52.033257),
      new MapsCoordinate(5.679981, 52.034237),
    ]),
  );
  const [walkedRoute, setWalkedRoute] = useState<MapsLine>(
    new MapsLine([new MapsCoordinate(5.674306, 52.030954)]),
  );
  //Trackmap is in a state because it wouldn't update from its own.
  //Using a state makes sure it will allways be updated.
  const [Map, setMap] = useState<object>(
    <TrackMap
      mapsLines={[route, walkedRoute]}
      mapsPoint={new MapsPoint([])}
      center={walkedRoute.getLastCoordinate().toArray()}
      zoom={14}
    />,
  );

  useEffect(() => {
    const trackGPS = async () => {
      try {
        const COORDINATE = await getLocation();
        setTracking(true);
        const MAPLINE = walkedRoute;
        MAPLINE.pushCoordinate(
          new MapsCoordinate(COORDINATE.longitude, COORDINATE.latitude),
        );

        setWalkedRoute(MAPLINE);
        setMap(
          <TrackMap
            mapsLines={[route, MAPLINE]}
            mapsPoint={new MapsPoint([])}
            center={walkedRoute.getLastCoordinate().toArray()}
            zoom={14}
          />,
        );
        console.log(walkedRoute);
      } catch {
        setTracking(false);
        return;
      }
    };

    setIntervalNr(
      //@ts-ignore - In normal js (also here) setInterval returns a number.
      //ESLint thinks that it isnt a number but a Datatype that doesn't excists.
      setInterval(() => {
        trackGPS();
      }, GPS_INTERVAL),
    );
  }, []); // the array is supposed to be empty. It should only run once.

  console.log(intervalNr);

  return (
    <>
      <View style={styles.page}>
        {tracking ? <></> : <Error errorCode={500} message={undefined} />}
        <View style={styles.container}>{Map}</View>
        <View style={styles.boxes}>
          <Pressable
            style={styles.button}
            onPress={() => {
              //@ts-ignore - In normal js (also here) setInterval returns a number.
              //ESLint thinks that it isnt a number but a Datatype that doesn't excists.
              clearInterval(intervalNr);
              console.log('Stopped!');
            }}>
            <MaterialCommunityIcons
              name="square"
              size={30}
              color={brittishPalette.white}
            />
          </Pressable>
          <Pressable style={styles.button}>
            <MaterialCommunityIcons
              name="pause"
              size={30}
              color={brittishPalette.white}
            />
          </Pressable>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#F5FCFF',
  },
  container: {
    height: 250,
    width: '100%',
    backgroundColor: '#F0F0F1FF',
  },
  boxes: {
    display: 'flex',
    flexWrap: 'nowrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: colors.main,
    borderRadius: 200,
    padding: 30,
  },
});

export default RecordActivity;

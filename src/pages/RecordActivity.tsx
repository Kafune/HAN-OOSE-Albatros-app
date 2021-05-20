import React, {FC, useState, useEffect} from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import TrackMap from '../components/TrackMap';
import {MapsLine} from '../core/maps/MapsLine';
import {MapsCoordinate} from '../core/maps/MapsCoordinate';
import {MapsPoint} from '../core/maps/MapsPoints';
import getLocation from '../core/maps/GetLocation';
import {Error} from '../components/Error';
import colors, {brittishPalette} from '../styles/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {RecordActivityInformation} from '../components/RecordActivityInformation';
import {Duration} from '../core/maps/Duration';
import {RecordTime} from '../core/maps/RecordTime';
import Dialog from 'react-native-dialog';
import {RouteMapper} from '../core/mapper/RouteMapper';
import {setStoreWalkedRoute} from '../core/redux/actions/walkedRouteActions';
import {MapsLineMapper} from '../core/mapper/MapsLineMapper';

type props = {
  navigation: {navigate: (arg0: string) => void};
};

const RecordActivity: React.FC<props> = (props): JSX.Element => {
  //@ts-ignore TS error
  const route = useSelector(state =>
    state.routeLine !== undefined
      ? RouteMapper.toMapsLine(state.routeLine)
      : new MapsLine([]),
  ); //@ts-ignore TS error
  const originalRoute = useSelector(state => state.routeLine);
  const dispatch = useDispatch();

  const GPS_INTERVAL = 5000; // get GPS every 5000ms
  const [updateTime, setUpdateTime] = useState<number>(1);
  const [trackingError, setTrackingError] = useState<boolean>(false);
  const [intervalNr, setIntervalNr] = useState<number>(0);
  const [recordTime, setRecordTime] = useState<RecordTime[]>([
    new RecordTime(false),
  ]);
  const [walkedRoute, setWalkedRoute] = useState<MapsLine>(
    new MapsLine([new MapsCoordinate(5.211933, 52.512032)]),
  );
  const [dialog, setDialog] = useState<boolean>(false);

  const reset = () => {
    clearInterval(intervalNr);
    setUpdateTime(1);
    setTrackingError(false);
    setIntervalNr(0);
    setRecordTime([new RecordTime(false)]);
    setWalkedRoute(new MapsLine([new MapsCoordinate(5.211933, 52.512032)]));
    setDialog(false);
    setMap(
      <TrackMap
        mapsLines={[route, walkedRoute]}
        mapsPoint={new MapsPoint([])}
        center={walkedRoute.getLastCoordinate().toArray()}
        zoom={14}
      />,
    );
  };

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

  /**
   * Checks if the GPS should be requested.
   * @return {Promise}
   */
  const getGPSWithCheck = async () => {
    if (recordTime[recordTime.length - 1].isEndNode) {
      return new Promise<void>((resolve, reject) => {
        reject();
      });
    }
    return getLocation();
  };

  useEffect(() => {
    /**
     *Handles the Gps tracking.
     */
    const trackGPS = async () => {
      try {
        const COORDINATE = await getGPSWithCheck();
        setTrackingError(false);
        const MAPLINE = walkedRoute;
        if (
          MAPLINE.getfirstCoordinate().latitude === 52.512032 &&
          MAPLINE.getfirstCoordinate().longitude === 5.211933
        ) {
          MAPLINE.shift();
        }
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
      } catch {
        setTrackingError(true);
      }
    };

    setIntervalNr(
      //@ts-ignore - In normal js (also here) setInterval returns a number.
      //ESLint thinks that it isnt a number but a Datatype that doesn't excists.
      setInterval(() => {
        trackGPS();
      }, GPS_INTERVAL),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // the array is supposed to be empty. It should only run once.

  useEffect(() => {
    let x = setTimeout(() => {
      if (updateTime > 100) {
        setUpdateTime(1);
      } else {
        setUpdateTime(updateTime + 1);
      }
    }, 950);
    return () => clearInterval(x);
  });

  /**
   * Generates the thime without pauses.
   *
   * @return {*}  {number}
   */
  const getTimeWithoutPauses = (): number => {
    const baseTime = recordTime[0].dateTime;
    let endTime = 0;
    let pausedTime = 0;
    let totalTime = 0;
    recordTime.forEach(element => {
      if (element.isEndNode) {
        endTime = element.dateTime;
      } else {
        if (element.dateTime !== baseTime) {
          pausedTime += element.dateTime - endTime;
        }
      }
    });
    totalTime = new Date().getTime() - baseTime - pausedTime;
    if (recordTime[recordTime.length - 1].isEndNode) {
      totalTime = endTime - baseTime - pausedTime;
    }
    return totalTime;
  };

  /**
   * choses what error it should return based on a trackingError or a endNode.
   * @return {JSX}
   */
  const genError = () => {
    if (recordTime[recordTime.length - 1].isEndNode) {
      return <Error errorCode={602} message={undefined} />;
    } else if (trackingError) {
      return <Error errorCode={601} message={undefined} />;
    }
    return <></>;
  };

  return (
    <>
      {/* quitDialog: */}
      <Dialog.Container visible={dialog}>
        <Dialog.Title>Activiteit stoppen</Dialog.Title>
        <Dialog.Description>
          Weet je zeker dat je het opnemen van een activiteit wilt stoppen?
        </Dialog.Description>
        <Dialog.Button label="Annuleren" onPress={() => setDialog(false)} />
        <Dialog.Button
          label="Stoppen"
          onPress={() => {
            let temp = recordTime;
            temp.push(new RecordTime(true));
            setRecordTime(temp);
            clearInterval(intervalNr);
            console.log('Stopped!');
            setDialog(false);
            let reduxRoute = MapsLineMapper.mapsLineToActivity(walkedRoute);
            reduxRoute.duration = getTimeWithoutPauses();
            reduxRoute.calculatePoints();
            reduxRoute.routeId = originalRoute.id;
            dispatch(
              setStoreWalkedRoute({
                ...reduxRoute,
                middlePoint: reduxRoute.middlePoint,
                name: originalRoute.name,
              }),
            );
            // navigate
            props.navigation.navigate('recordedActivity');

            reset();
          }}
        />
      </Dialog.Container>

      <View style={styles.page}>
        {/* Error handler */}
        {genError()}

        {/* Map */}
        <View style={styles.container}>{Map}</View>

        {/* Activity info */}
        <RecordActivityInformation
          duration={new Duration(getTimeWithoutPauses())}
          distance={walkedRoute.getTotalKm()}
        />

        {/* Play Pause buttons */}
        <View style={styles.boxes}>
          {recordTime[recordTime.length - 1].isEndNode ? (
            <Pressable
              style={styles.button}
              onPress={() => {
                setDialog(true);
              }}>
              <MaterialCommunityIcons
                name="square"
                size={30}
                color={brittishPalette.white}
              />
            </Pressable>
          ) : (
            <></>
          )}
          <Pressable
            style={styles.button}
            onPress={() => {
              let temp = recordTime;
              temp.push(
                new RecordTime(!recordTime[recordTime.length - 1].isEndNode),
              );
              setRecordTime(temp);
              console.log('paused ');
            }}>
            <MaterialCommunityIcons
              name={
                recordTime[recordTime.length - 1].isEndNode ? 'play' : 'pause'
              }
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
    height: '100%',
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

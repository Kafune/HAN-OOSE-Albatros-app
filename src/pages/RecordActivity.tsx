import React, {FC, useState, useEffect} from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import TrackMap from '../components/TrackMap';
import {MapsLine} from '../core/maps/MapsLine';
import {MapsCoordinate} from '../core/maps/MapsCoordinate';
import {MapsPoint} from '../core/maps/MapsPoints';
import getLocation from '../core/maps/GetLocation';
import {Error} from '../components/Error';
import colors, {brittishPalette} from '../styles/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {RecordActivityInformation} from '../components/RecordActivityInformation';
import {Duration} from '../core/domain/Duration';
import {RecordTime} from '../core/domain/RecordTime';

type Props = {
  route: MapsLine;
};
const RecordActivity: FC<Props> = props => {
  //todo get form redux
  let route = new MapsLine([
    new MapsCoordinate(5.674306, 52.030944),
    new MapsCoordinate(5.675282, 52.030033),
    new MapsCoordinate(5.679166, 52.030257),
    new MapsCoordinate(5.679166, 52.033257),
    new MapsCoordinate(5.679981, 52.034237),
  ]);

  const GPS_INTERVAL = 950; // get GPS every 950ms
  const [trackingError, setTrackingError] = useState<boolean>(false);
  const [intervalNr, setIntervalNr] = useState<number>(0);
  const [recordTime, setRecordTime] = useState<RecordTime[]>([
    new RecordTime(false),
  ]);
  const [walkedRoute, setWalkedRoute] = useState<MapsLine>(
    new MapsLine([new MapsCoordinate(5.2119331111, 52.5120321111)]),
  );

  const getGPSWithCheck = async () => {
    if (recordTime[recordTime.length - 1].isEndNode) {
      return new Promise<void>((resolve, reject) => {
        reject();
      });
    }
    return getLocation();
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

  useEffect(() => {
    const trackGPS = async () => {
      try {
        const COORDINATE = await getGPSWithCheck();
        setTrackingError(false);
        const MAPLINE = walkedRoute;
        if (
          MAPLINE.getfirstCoordinate().latitude === 5.2119331111 &&
          MAPLINE.getfirstCoordinate().longitude === 52.5120321111
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // the array is supposed to be empty. It should only run once.

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
      <View style={styles.page}>
        {genError()}
        <View style={styles.container}>{Map}</View>
        <RecordActivityInformation
          duration={new Duration(getTimeWithoutPauses())}
          distance={walkedRoute.getTotalKm()}
        />

        <View style={styles.boxes}>
          {recordTime[recordTime.length - 1].isEndNode ? (
            <Pressable
              style={styles.button}
              onPress={() => {
                let temp = recordTime;
                temp.push(new RecordTime(true));
                setRecordTime(temp);
                clearInterval(intervalNr);
                console.log('Stopped!');
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

import React, {FC, useState, useEffect} from 'react';
import {Button} from 'react-native';
import TrackMap from '../components/TrackMap';
import {MapsLine} from '../core/maps/MapsLine';
import {MapsCoordinate} from '../core/maps/MapsCoordinate';
import {MapsPoint} from '../core/maps/MapsPoints';
import getLocation from '../core/maps/GetLocation';
import {Error} from '../components/Error';

const RecordActivity: FC = () => {
  const GPS_INTERVAL = 2500; // get GPS every 2500ms
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
  }, [intervalNr, route, walkedRoute]);
  console.log(intervalNr);

  return (
    <>
      {tracking ? <></> : <Error errorCode={500} message={undefined} />}
      {Map}
      <Button
        onPress={() => {
          //@ts-ignore - In normal js (also here) setInterval returns a number.
          //ESLint thinks that it isnt a number but a Datatype that doesn't excists.
          clearInterval(intervalNr);
        }}
        title="stoppen"
      />
    </>
  );
};

export default RecordActivity;

import React, {FC, useState, useEffect} from 'react';
import TrackMap from '../components/TrackMap';
import {MapsLine} from '../core/maps/MapsLine';
import {MapsCoordinate} from '../core/maps/MapsCoordinate';
import {MapsPoint} from '../core/maps/MapsPoints';
import getLocation from '../core/maps/GetLocation';

const RecordActivity: FC = () => {
  const GPS_INTERVAL = 2000; // get GPS every 2000ms
  const [paused, setPaused] = useState<boolean>(false);
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
  //Super ugly fix. After trying for 8 hours,t TrackMap woudnt update. So I did this. Ill look at it tomorrow
  const [Map, setMap] = useState<object>(
    <TrackMap
      mapsLines={[route, walkedRoute]}
      mapsPoint={new MapsPoint([])}
      center={walkedRoute.getLastCoordinate().toArray()}
      zoom={14}
    />,
  );

  useEffect(() => {
    const excecuteFunction = async () => {
      const COORDINATE = await getLocation();
      if (!COORDINATE?.longitude || !COORDINATE?.latitude) {
        //error handle|
        return;
      }
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
    };

    const interval = setInterval(async () => {
      excecuteFunction();
    }, GPS_INTERVAL);

    return () => clearInterval(interval);
  }, [walkedRoute]);

  return <>{Map}</>;
};

export default RecordActivity;

import React, {FC} from 'react';
import Maps from '../components/Maps';
import {MapsLine} from '../core/maps/MapsLine';
import {MapsCoordinate} from '../core/maps/MapsCoordinate';
import {MapsPoint} from '../core/maps/MapsPoints';

const MapsPage: FC = () => {
  return (
    <Maps
      mapsLine={
        new MapsLine([
          new MapsCoordinate(5.674306, 52.030944),
          new MapsCoordinate(5.675282, 52.030033),
          new MapsCoordinate(5.679166, 52.030257),
          new MapsCoordinate(5.679166, 52.033257),
          new MapsCoordinate(5.679981, 52.034237),
        ])
      }
      mapsPoint={
        new MapsPoint([
          new MapsCoordinate(5.674306, 52.030944),
          new MapsCoordinate(5.679981, 52.034237),
        ])
      }
      center={[5.679166, 52.030257]}
      zoom={13}
    />
  );
};

export default MapsPage;

import {MapsCoordinate} from '../class/MapsCoordinate';

export interface IGeometry {
  type: String;
  coordinates: Array<MapsCoordinate>;
}

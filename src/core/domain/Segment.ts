import {Coordinate} from './Coordinate';
import {POI} from './POI';

export interface Segment {
  id: number;
  start: Coordinate;
  end: Coordinate;
  poi?: POI;
}

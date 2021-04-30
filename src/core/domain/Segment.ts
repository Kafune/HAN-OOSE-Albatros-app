import {Coordinate} from './Coordinate';
import {PointOfInterest} from './PointOfInterest';

export interface Segment {
  id: number;
  start: Coordinate;
  end?: Coordinate;
  poi?: PointOfInterest;
}

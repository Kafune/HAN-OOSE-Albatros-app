import {Coordinate} from '../domain/Coordinate';

export interface SegmentDTO {
  id: number;
  startCoordinate: Coordinate;
  endCoordinate: Coordinate;
}

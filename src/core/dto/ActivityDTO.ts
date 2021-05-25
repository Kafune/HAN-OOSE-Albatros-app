import {SegmentDTO} from './SegmentDTO';

export interface ActivityDTO {
  routeId: number;
  userId: number;
  point: Number;
  duration: number;
  distance: Number;
  segments: SegmentDTO[];
}

import {SegmentDTO} from './SegmentDTO';

export interface ActivityDTO {
  routeId: number;
  userId: number;
  point: number;
  duration: number;
  distance: number;
  segments: SegmentDTO[];
}

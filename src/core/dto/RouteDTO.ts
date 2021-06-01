import {SegmentDTO} from './SegmentDTO';

export default interface RouteDTO {
  distance: number;
  name: string;
  routeId: number;
  description: string;
  segments: SegmentDTO[];
}

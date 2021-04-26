import {POIResponseDTO} from './POIResponseDTO';
import {CoordinateResponseDTO} from './CoordinateResponseDTO';

export default interface SegmentResponseDTO {
  id: number;
  POI: POIResponseDTO;
  startCoordinate: CoordinateResponseDTO;
  endCoordinate: CoordinateResponseDTO;
}

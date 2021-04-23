import SegmentResponseDTO from '../dto/SegmentResponseDTO';
import {Segment} from '../domain/Segment';

export class SegmentMapper {
  /**
   * Maps a single Segment DTO to a domain.
   * @param {SegmentResponseDTO} DTO
   * @returns {Segment}
   */
  static toDomain(DTO: SegmentResponseDTO): Segment {
    return {
      id: DTO.id,
      start: DTO.startCoordinate,
      end: DTO.endCoordinate,
      poi: DTO.POI,
    };
  }

  /**
   * Maps multiple segment DTOs to an array of domains.
   * @param {SegmentResponseDTO[]} DTOs
   * @returns {Segment[]}
   */
  static multipleToDomain(DTOs: SegmentResponseDTO[]): Segment[] {
    return DTOs.map((segment: SegmentResponseDTO) => this.toDomain(segment));
  }
}

import SegmentResponseDTO from '../dto/SegmentResponseDTO';
import {Segment} from '../domain/Segment';
import {SegmentDTO} from '../dto/SegmentDTO';

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
    return DTOs.map(DTO => this.toDomain(DTO));
  }

  /**
   * Maps a single Segment domain to a DTO.
   * @returns {Segment}
   * @param segment
   */
  static toDTO(segment: Segment): SegmentDTO {
    return {
      id: segment.id,
      startCoordinate: segment.start,
      endCoordinate: segment.end,
    };
  }

  /**
   * Maps segments to DTOs.
   * @returns {Segment}
   * @param segments
   */
  static multipleToDTO(segments: Segment[]): SegmentDTO[] {
    return segments.map(segment => this.toDTO(segment));
  }
}

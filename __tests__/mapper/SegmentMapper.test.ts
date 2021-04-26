import SegmentResponseDTO from '../../src/core/dto/SegmentResponseDTO';
import {SegmentMapper} from '../../src/core/mapper/SegmentMapper';

const segmentDTOs: SegmentResponseDTO[] = [
  {
    id: 1,
    POI: {id: 1, name: 'POI 1', description: 'Description POI 1'},
    startCoordinate: {longitude: 1, latitude: 1, altitude: 1},
    endCoordinate: {longitude: 2, latitude: 2, altitude: 2},
  },
  {
    id: 1,
    POI: {id: 2, name: 'POI 2', description: 'Description POI 2'},
    startCoordinate: {longitude: 3, latitude: 3, altitude: 3},
    endCoordinate: {longitude: 4, latitude: 4, altitude: 4},
  },
];

describe('Segment Mapper tests', () => {
  it('Maps DTO to domain correctly', () => {
    const DTO = segmentDTOs[0];
    const domain = SegmentMapper.toDomain(DTO);

    expect(domain.id).toBe(DTO.id);
    expect(domain.poi?.id).toBe(DTO.POI.id);
    expect(domain.poi?.name).toBe(DTO.POI.name);
    expect(domain.poi?.description).toBe(DTO.POI.description);
    expect(domain.start.latitude).toBe(DTO.startCoordinate.latitude);
    expect(domain.start.longitude).toBe(DTO.startCoordinate.longitude);
    expect(domain.start.altitude).toBe(DTO.startCoordinate.altitude);
    expect(domain.end.latitude).toBe(DTO.endCoordinate.latitude);
    expect(domain.end.longitude).toBe(DTO.endCoordinate.longitude);
    expect(domain.end.altitude).toBe(DTO.endCoordinate.altitude);
  });

  it('Maps multiple DTOs to domain correctly', () => {
    const domains = SegmentMapper.multipleToDomain(segmentDTOs);

    for (let i = 0; i > domains.length; i++) {
      expect(domains[i].id).toBe(segmentDTOs[i].id);
      expect(domains[i].poi?.id).toBe(segmentDTOs[i].POI.id);
      expect(domains[i].poi?.name).toBe(segmentDTOs[i].POI.name);
      expect(domains[i].poi?.description).toBe(segmentDTOs[i].POI.description);
      expect(domains[i].start.latitude).toBe(
        segmentDTOs[i].startCoordinate.latitude,
      );
      expect(domains[i].start.longitude).toBe(
        segmentDTOs[i].startCoordinate.longitude,
      );
      expect(domains[i].start.altitude).toBe(
        segmentDTOs[i].startCoordinate.altitude,
      );
      expect(domains[i].end.latitude).toBe(
        segmentDTOs[i].endCoordinate.latitude,
      );
      expect(domains[i].end.longitude).toBe(
        segmentDTOs[i].endCoordinate.longitude,
      );
      expect(domains[i].end.altitude).toBe(
        segmentDTOs[i].endCoordinate.altitude,
      );
    }
  });
});

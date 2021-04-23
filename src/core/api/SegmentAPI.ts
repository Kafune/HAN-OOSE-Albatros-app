import {Segment} from '../domain/Segment';
import api from '../data/api';
import {SegmentMapper} from '../mapper/SegmentMapper';

export class SegmentAPI {
  /**
   * Get's all the segments from the TomEE API based on the route id.
   * @param {number} routeId
   * @returns {Promise<Segment[]>}
   */
  static async getSegments(routeId: number): Promise<Segment[]> {
    return await fetch(`${api.baseUrl}/segments/${routeId}`, api.headers)
      .then(segments => segments.json())
      .then(segments => SegmentMapper.multipleToDomain(segments));
  }
}

import {ICoordinate} from './ICoordinate';
import {IPOI} from './IPOI';

export interface ISegment {
  id: number;
  start: ICoordinate;
  end: ICoordinate;
  poi: IPOI;
}

import {Segment} from './Segment';

export interface Route {
  name: string;
  kilometers: number;
  description: string;
  segments: Segment[];
}

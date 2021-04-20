import { MapsCoordinate } from "../class/MapsCoordinate";

export interface Geometry {
  type: String
  coordinates: Array<MapsCoordinate>
}
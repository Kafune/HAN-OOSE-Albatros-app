import { MapsCoordinate } from './MapsCoordinate';

/**
 * MapsLine a object that can be used as GEOJson for a line
 *
 * @author Robert Boudewijn
 * @date 2021/04/20
 * @export
 * @class MapsLine
 */
export class MapsLine {
    type;
    geometry;

    /**
     * Creates an instance of MapsLine.
     * @author Robert Boudewijn
     * @date 2021/04/20
     * @param {Array<MapsCoordinate>} coordinates
     * @memberof MapsLine
     */
    constructor(coordinates) {
        this.type = "Feature";
        this.geometry = {
            "type": "LineString",
            "coordinates": coordinates.map(item => item.toArray())
        };
    }

    /**
     *The map() method creates a new array populated with the results of calling a provided function on every element in the calling array.
     *
     * @author Robert Boudewijn
     * @date 2021/04/20
     * @param {*} function
     * @memberof MapsLine
     */
    map(funct){
        for(let i in this.geometry.coordinates){
            funct(i);
        }
    }

}

import React from 'react';
import {StyleSheet, View} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {Geometry} from 'geojson';
import {MapsLine} from '../core/maps/MapsLine';
import {MapsPoint} from '../core/maps/MapsPoints';
import {brittishPalette} from '../styles/colors';

interface Props {
  mapsLines: MapsLine[];
  mapsPoint: MapsPoint;
  zoom: number;
  center: number[];
}

const TrackMap: React.FC<Props> = ({
  mapsLines,
  mapsPoint,
  zoom,
  center,
}): JSX.Element => {
  MapboxGL.setAccessToken(
    'sk.eyJ1Ijoibnh0dHgiLCJhIjoiY2tub283bDJuMHEzeTJ1bGFncXhhcDdtMCJ9.-sPoE4Vm2kF1K5PEqBnR9g',
  );

  const buildGeoJSon: any = (mapLine: MapsLine) => {
    const object: Geometry = {
      type: 'LineString',
      coordinates: mapLine.mapLineCoordinates,
    };
    return object;
  };

  const createGeoJSON: any = () => {
    let count = -1;
    return mapsLines.map(mapLine => {
      count++;
      return (
        <MapboxGL.ShapeSource
          id={'Line' + count}
          shape={buildGeoJSon(mapLine)}
          key={count}>
          <MapboxGL.LineLayer
            id={'Line' + count}
            style={layerStyles[count]}
            key={'Line' + count}
          />
        </MapboxGL.ShapeSource>
      );
    });
  };

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <MapboxGL.MapView style={styles.map} logoEnabled={false} key="trackmap">
          <MapboxGL.Camera
            zoomLevel={zoom ?? 13}
            pitch={0}
            centerCoordinate={center}
          />
          {createGeoJSON()}
          {mapsPoint !== undefined &&
            mapsPoint.coordinates.map(point => (
              <MapboxGL.PointAnnotation
                id={point.toString()}
                coordinate={point}
                key={point.toString()}
              />
            ))}
        </MapboxGL.MapView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  container: {
    height: 250,
    width: '100%',
    backgroundColor: '#F0F0F1FF',
  },
  map: {
    flex: 1,
  },
});

const layerStyles = [
  {
    lineColor: brittishPalette.blue,
    // @ts-ignore We can't modify the inner code of MapboxGL.
    lineCap: MapboxGL.LineJoin.Round,
    lineWidth: 3,
    lineOpacity: 0.85,
  },
  {
    lineColor: brittishPalette.red,
    // @ts-ignore We can't modify the inner code of MapboxGL.
    lineCap: MapboxGL.LineJoin.Round,
    lineWidth: 3,
    lineOpacity: 0.84,
  },
];

export default TrackMap;

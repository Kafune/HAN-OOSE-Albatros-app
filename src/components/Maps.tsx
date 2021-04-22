import React from 'react';
import {View, StyleSheet} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {Geometry, Position} from 'geojson';
import {MapsLine} from '../core/maps/MapsLine';
import {MapsPoint} from '../core/maps/MapsPoints';

interface Props {
  mapsLine: MapsLine;
  mapsPoint: MapsPoint;
  zoom: number;
  center: number[];
}

const Maps: React.FC<Props> = ({
  mapsLine,
  mapsPoint,
  zoom,
  center,
}): JSX.Element => {
  MapboxGL.setAccessToken(
    'sk.eyJ1Ijoibnh0dHgiLCJhIjoiY2tub283bDJuMHEzeTJ1bGFncXhhcDdtMCJ9.-sPoE4Vm2kF1K5PEqBnR9g',
  );

  const layerStyles = {
    LineStyle: {
      lineColor: '#0CA596',
      // @ts-ignore We can't modify the inner code of MapboxGL.
      lineCap: MapboxGL.LineJoin.Round,
      lineWidth: 3,
      lineOpacity: 0.84,
    },
  };

  const geoJSON: Geometry = {
    type: 'LineString',
    coordinates: mapsLine.mapLineCoordinates,
  };

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <MapboxGL.MapView style={styles.map} logoEnabled={false}>
          <MapboxGL.Camera
            zoomLevel={zoom ?? 13}
            pitch={0}
            centerCoordinate={center}
          />
          <MapboxGL.ShapeSource id="routeSource" shape={geoJSON}>
            <MapboxGL.LineLayer id="route" style={layerStyles.LineStyle} />
          </MapboxGL.ShapeSource>
          {mapsPoint !== undefined &&
            mapsPoint.map((point: Position) => (
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

export default Maps;

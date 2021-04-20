import React from 'react';
import {View, StyleSheet} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {Geometry, Position} from 'geojson';

function Maps(props: React.ComponentProps<any>): JSX.Element {
  MapboxGL.setAccessToken(
    'sk.eyJ1Ijoibnh0dHgiLCJhIjoiY2tub283bDJuMHEzeTJ1bGFncXhhcDdtMCJ9.-sPoE4Vm2kF1K5PEqBnR9g',
  );

  const layerStyles = {
    LineStyle: {
      lineColor: '#007CBE',
      // @ts-ignore We can't modify the inner code of MapboxGL.
      lineCap: MapboxGL.LineJoin.Round,
      lineWidth: 3,
      lineOpacity: 0.84,
    },
  };

  const geoJSON: Geometry = {
    type: 'LineString',
    coordinates: props.geoJSON.getCoordinates(),
  };

  function generatePoints() {
    if (props.mapPoints === undefined) {
      return;
    }
    return props.mapPoints.map((point: Position) => (
      <MapboxGL.PointAnnotation
        id={point.toString()}
        coordinate={point}
        key={point.toString()}
      />
    ));
  }

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <MapboxGL.MapView style={styles.map}>
          <MapboxGL.Camera
            zoomLevel={props.zoom ? props.zoom : 13}
            pitch={0}
            centerCoordinate={props.center}
          />
          <MapboxGL.ShapeSource id="routeSource" shape={geoJSON}>
            <MapboxGL.LineLayer id="route" style={layerStyles.LineStyle} />
          </MapboxGL.ShapeSource>
          {generatePoints()}
        </MapboxGL.MapView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  container: {
    height: 300,
    width: '100%',
    backgroundColor: 'tomato',
  },
  map: {
    flex: 1,
  },
});

export default Maps;

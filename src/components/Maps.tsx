import React from 'react';
import {View, StyleSheet} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {Geometry} from 'geojson';

const Maps = (props: any) => {
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
    coordinates: props.geoJSON.getCordinates(),
  };

  function genaratePoints() {
    if (props.mapPoints === undefined) {
      return;
    }
    console.log(props.mapPoints);
    return props.mapPoints.map((point: any) => (
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
        <MapboxGL.MapView style={styles.map} logoEnabled={false}>
          <MapboxGL.Camera
            zoomLevel={props.zoom ? props.zoom : 13}
            pitch={0}
            centerCoordinate={props.center}
          />
          <MapboxGL.ShapeSource id="routeSoucre" shape={geoJSON}>
            <MapboxGL.LineLayer id="route" style={layerStyles.LineStyle} />
          </MapboxGL.ShapeSource>
          {genaratePoints()}
        </MapboxGL.MapView>
      </View>
    </View>
  );
};

//{ type: string; features: { type: string; geometry: { type: string; coordinates: number[][]; }; }[]; }

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
    backgroundColor: 'tomato',
  },
  map: {
    flex: 1,
  },
});

export default Maps;

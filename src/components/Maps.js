import React, { useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import MapboxGL from "@react-native-mapbox-gl/maps";

const SF_OFFICE_COORDINATE = [5.8385909,51.9852637]; //long, lat

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  container: {
    height: 300,
    width: 300,
    backgroundColor: "tomato"
  },
  map: {
    flex: 1
  },
});

const Maps = () => {
  MapboxGL.setAccessToken("sk.eyJ1Ijoibnh0dHgiLCJhIjoiY2tub283bDJuMHEzeTJ1bGFncXhhcDdtMCJ9.-sPoE4Vm2kF1K5PEqBnR9g");


  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <MapboxGL.MapView style={styles.map} >
          <MapboxGL.Camera
            zoomLevel={12}
            pitch={0}
            centerCoordinate={SF_OFFICE_COORDINATE}
          />
        </MapboxGL.MapView>
      </View>
    </View>
  );
};

export default Maps;

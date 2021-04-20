import React, { useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import MapboxGL from "@react-native-mapbox-gl/maps";


const Maps = (props) => {
  MapboxGL.setAccessToken("sk.eyJ1Ijoibnh0dHgiLCJhIjoiY2tub283bDJuMHEzeTJ1bGFncXhhcDdtMCJ9.-sPoE4Vm2kF1K5PEqBnR9g");

  const layerStyles = {
    LineStyle: {
      lineColor: '#007CBE',
      lineCap: MapboxGL.LineJoin.Round,
      lineWidth: 3,
      lineOpacity: 0.84,
    },
  };

  let geoJSON = {
    "type": "FeatureCollection",
    "features":()=>{
      if(props.geoJSON == undefined ){
        return null;
      }
      return props.geoJSON.map((geoJson) => geoJson)
    }
      
  }


  function genaratePoints() {
    if(props.mapPoints == undefined ){
      return null;
    }
    let points = props.mapPoints.map((point) => {
      return <MapboxGL.PointAnnotation coordinate={point} key={point.toString()} />
    })
    return points;
  }

  return (
    <>
      <View style={styles.page}>
        <View style={styles.container}>
          <MapboxGL.MapView style={styles.map} >
            <MapboxGL.Camera
              zoomLevel={((props.zoom) ? props.zoom : 13)}
              pitch={0}
              centerCoordinate={props.center}
            />

            <MapboxGL.ShapeSource id="routeSoucre" shape={geoJSON}>
              <MapboxGL.LineLayer
                id="route"
                style={layerStyles.LineStyle}
              />
            </MapboxGL.ShapeSource>
            {genaratePoints()}
          </MapboxGL.MapView>
        </View>
      </View>
    </>
  );
};



const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  container: {
    height: 300,
    width: '100%',
    backgroundColor: "tomato"
  },
  map: {
    flex: 1
  },
});


export default Maps;

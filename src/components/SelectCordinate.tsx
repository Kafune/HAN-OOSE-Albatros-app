import React, {useState} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {Position} from 'geojson';

interface Props {
  addCordinate: Function;
}

const SelectCordinate: React.FC<Props> = ({addCordinate}): JSX.Element => {
  MapboxGL.setAccessToken(
    'sk.eyJ1Ijoibnh0dHgiLCJhIjoiY2tub283bDJuMHEzeTJ1bGFncXhhcDdtMCJ9.-sPoE4Vm2kF1K5PEqBnR9g',
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [mapsPoint, setMapsPoint] = useState<Position>([0, 0.0]);

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <MapboxGL.MapView style={styles.map} logoEnabled={false}>
          <MapboxGL.Camera zoomLevel={13} pitch={0} />
          {/*centerCoordinate={center}*/}
          <MapboxGL.PointAnnotation
            id={mapsPoint.toString()}
            coordinate={mapsPoint}
            key={mapsPoint.toString()}
          />
        </MapboxGL.MapView>
        <Button onPress={() => addCordinate()} title="save" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
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

export default SelectCordinate;

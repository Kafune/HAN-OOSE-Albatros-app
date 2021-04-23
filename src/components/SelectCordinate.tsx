import React, {useState} from 'react';
import {View, StyleSheet, Pressable, Text} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {Position} from 'geojson';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import getLocation from '../core/maps/GetLocation';
import colors from '../styles/colors';
import {Opad} from './Opad';

interface Props {
  addCordinate: Function;
  cancel: Function;
}

const SelectCordinate: React.FC<Props> = (props: Props): JSX.Element => {
  MapboxGL.setAccessToken(
    'sk.eyJ1Ijoibnh0dHgiLCJhIjoiY2tub283bDJuMHEzeTJ1bGFncXhhcDdtMCJ9.-sPoE4Vm2kF1K5PEqBnR9g',
  );
  const [mapsPoint, setMapsPoint] = useState<Position>([5.6679899, 52.0430533]);
  const [zoom, setZoom] = useState<number>(13);

  const setCurrentGps = async () => {
    const location = await getLocation();
    console.log(location);
    setMapsPoint([location.longitude, location.latitude]);
  };

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <MapboxGL.MapView style={styles.map} logoEnabled={false}>
          <MapboxGL.Camera
            zoomLevel={zoom}
            pitch={0}
            centerCoordinate={mapsPoint}
          />

          <MapboxGL.PointAnnotation
            id={mapsPoint.toString()}
            coordinate={mapsPoint}
            key={mapsPoint.toString()}
          />
        </MapboxGL.MapView>
      </View>

      <View style={styles.boxes}>
        <View style={[{...styles.box}, {...styles.boxIs1}]}>
          <MaterialCommunityIcons
            name="arrow-left"
            size={30}
            color={colors.main}
            onPress={() => {
              props.cancel();
            }}
          />
        </View>

        <View style={[{...styles.box}, {...styles.boxIs8}, {...styles.button}]}>
          <Pressable onPress={() => setCurrentGps()} style={styles.buttonInner}>
            <MaterialCommunityIcons
              name="map-marker"
              size={30}
              color={colors.main}
            />

            <Text>Neem huidige locatie over.</Text>
          </Pressable>
        </View>
        <View style={[{...styles.box}, {...styles.boxIs1}]} />
      </View>
      <Opad
        onPressUp={() => {
          console.log('Click!');
        }}
        onPressDown={() => {
          console.log('Click!');
        }}
        onPressMiddle={() => {
          console.log('Click!');
        }}
        onPressLeft={() => {
          console.log('Click!');
        }}
        onPressRight={() => {
          console.log('Click!');
        }}
      />

      <View style={styles.boxes}>
        <View style={[{...styles.box}, {...styles.boxIs3}]} />
        <View style={[{...styles.box}, {...styles.boxIs4}, {...styles.button}]}>
          <Pressable onPress={() => props.addCordinate()}>
            <Text>Opslaan</Text>
          </Pressable>
        </View>
        <View style={[{...styles.box}, {...styles.boxIs3}]} />
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
  button: {
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    borderRadius: 5,
    padding: 5,
  },
  buttonInner: {
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  boxes: {
    marginTop: 5,
    display: 'flex',
    flexWrap: 'nowrap',
    flexDirection: 'row',
  },
  box: {
    // flexBasis: 0,
    // flexGrow: 1,
    // flexShrink: 1,
    // padding: 0,
  },
  boxIs1: {
    minWidth: '10%',
    maxWidth: '10%',
  },
  boxIs2: {
    minWidth: '20%',
  },
  boxIs3: {
    minWidth: '30%',
  },
  boxIs4: {
    minWidth: '40%',
  },
  boxIs5: {
    minWidth: '50%',
  },
  boxIs6: {
    minWidth: '60%',
  },
  boxIs7: {
    minWidth: '70%',
  },
  boxIs8: {
    minWidth: '80%',
  },
  boxIs9: {
    minWidth: '90%',
  },
});

export default SelectCordinate;

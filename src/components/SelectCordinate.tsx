import React, {useState} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Pressable,
  Text,
  Alert,
} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {Position} from 'geojson';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Slider from '@react-native-community/slider';
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
  const [zoom, setZoom] = useState<number>(17.5);

  const safe = (): void => {
    Alert.alert(
      'Wil je hier een punt opslaan?',
      'Longitude: ' + mapsPoint[0] + ',latitude: ' + mapsPoint[1],
      [
        {
          text: 'Nee',
          onPress: () => {},
          style: 'cancel',
        },
        {text: 'Opslaan', onPress: () => props.addCordinate(mapsPoint)},
      ],
    );
  };

  const handleOpad = (button: String) => {
    const phaseOne = {breakPoint: 16, amount: 0.25};
    const PhaseTwo = {breakPoint: 12, amount: 0.7};
    const phaseThree = {breakPoint: -1, amount: 1.5};

    switch (button) {
      case 'up':
        if (zoom >= phaseOne.breakPoint) {
          setMapsPoint([
            mapsPoint[0],
            mapsPoint[1] + phaseOne.amount / zoom ** 3,
          ]);
        } else if (zoom >= PhaseTwo.breakPoint) {
          setMapsPoint([
            mapsPoint[0],
            mapsPoint[1] + PhaseTwo.amount / zoom ** 3,
          ]);
        } else {
          console.log(1.5 / zoom ** 3);
          setMapsPoint([
            mapsPoint[0],
            mapsPoint[1] + phaseThree.amount / zoom ** 3,
          ]);
        }
        break;
      case 'left':
        if (zoom >= phaseOne.breakPoint) {
          setMapsPoint([
            mapsPoint[0] - phaseOne.amount / zoom ** 3,
            mapsPoint[1],
          ]);
        } else if (zoom >= PhaseTwo.breakPoint) {
          setMapsPoint([
            mapsPoint[0] - PhaseTwo.amount / zoom ** 3,
            mapsPoint[1],
          ]);
        } else {
          setMapsPoint([
            mapsPoint[0] - phaseThree.amount / zoom ** 3,
            mapsPoint[1],
          ]);
        }
        break;
      case 'right':
        if (zoom >= phaseOne.breakPoint) {
          setMapsPoint([
            mapsPoint[0] + phaseOne.amount / zoom ** 3,
            mapsPoint[1],
          ]);
        } else if (zoom >= PhaseTwo.breakPoint) {
          setMapsPoint([
            mapsPoint[0] + PhaseTwo.amount / zoom ** 3,
            mapsPoint[1],
          ]);
        } else {
          setMapsPoint([
            mapsPoint[0] + phaseThree.amount / zoom ** 3,
            mapsPoint[1],
          ]);
        }
        break;
      case 'down':
        if (zoom >= phaseOne.breakPoint) {
          setMapsPoint([
            mapsPoint[0],
            mapsPoint[1] - phaseOne.amount / zoom ** 3,
          ]);
        } else if (zoom >= PhaseTwo.breakPoint) {
          setMapsPoint([
            mapsPoint[0],
            mapsPoint[1] - PhaseTwo.amount / zoom ** 3,
          ]);
        } else {
          setMapsPoint([
            mapsPoint[0],
            mapsPoint[1] - phaseThree.amount / zoom ** 3,
          ]);
        }
        break;
      default:
        //nothing
        break;
    }
  };

  const setCurrentGps = async () => {
    const location = await getLocation();
    console.log(location);
    setMapsPoint([location.longitude, location.latitude]);
  };

  return (
    <ScrollView>
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

          <View
            style={[{...styles.box}, {...styles.boxIs8}, {...styles.button}]}>
            <Pressable
              onPress={() => setCurrentGps()}
              style={styles.buttonInner}>
              <MaterialCommunityIcons
                name="map-marker"
                size={30}
                color={colors.main}
              />

              <Text style={styles.buttonText}>Neem huidige locatie over.</Text>
            </Pressable>
          </View>
          <View style={[{...styles.box}, {...styles.boxIs1}]} />
        </View>

        <Opad
          onPressUp={() => handleOpad('up')}
          onPressDown={() => handleOpad('down')}
          onPressMiddle={() => safe()}
          onPressLeft={() => handleOpad('left')}
          onPressRight={() => handleOpad('right')}
        />

        <View style={styles.boxes}>
          <View style={[{...styles.box}, {...styles.boxIs1}]} />
          <View style={[{...styles.box}, {...styles.boxIs1}]}>
            <MaterialCommunityIcons
              name="magnify-minus-outline" //search-web //map-search-outline
              size={35}
              color={colors.main}
            />
          </View>
          <View style={[{...styles.box}, {...styles.boxIs6}]}>
            <Slider
              style={{width: '100%', height: 40}}
              value={zoom}
              minimumValue={4}
              maximumValue={18}
              minimumTrackTintColor="#000000" //{colors.secondary}
              maximumTrackTintColor="#000000" //{colors.secondary} //
              onValueChange={value => setZoom(value)}
            />
          </View>
          <View style={[{...styles.box}, {...styles.boxIs2}]}>
            <MaterialCommunityIcons
              name="magnify-plus-outline" //home-search
              size={35}
              color={colors.main}
            />
          </View>
        </View>
      </View>
    </ScrollView>
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
    padding: 8,
  },
  buttonInner: {
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  buttonText: {
    paddingTop: 2,
    fontSize: 18,
    color: colors.main,
    fontWeight: 'bold',
  },
  boxes: {
    marginTop: 12,
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

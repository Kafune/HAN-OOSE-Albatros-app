import React, {useState} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Pressable,
  Text,
  Alert,
} from 'react-native';
import {Position} from 'geojson';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Slider from '@react-native-community/slider';
import getLocation from '../core/maps/GetLocation';
import colors, {brittishPalette} from '../styles/colors';
import {Opad} from './Opad';
import {HandleOpad} from '../core/handlers/HandleOpad';
import Maps from './Maps';
import {MapsLine} from '../core/maps/MapsLine';
import {MapsCoordinate} from '../core/maps/MapsCoordinate';
import {MapsPoint} from '../core/maps/MapsPoints';

interface Props {
  addCoordinate: Function;
  cancel: Function;
}

const SelectCordinate: React.FC<Props> = (props: Props): JSX.Element => {
  const [mapsPoint, setMapsPoint] = useState<Position>([5.6679899, 52.0430533]);
  const [zoom, setZoom] = useState<number>(17.5);
  const handleOpad = new HandleOpad(mapsPoint);
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
        {text: 'Opslaan', onPress: () => props.addCoordinate(mapsPoint)},
      ],
    );
  };

  const setCurrentGps = async () => {
    try {
      const location = await getLocation();
      console.log(location);
      setMapsPoint([location.longitude, location.latitude]);
    } catch {}
  };

  return (
    <ScrollView>
      <View style={styles.page}>
        <View style={styles.container}>
          <Maps
            mapsLine={new MapsLine([])}
            mapsPoint={
              new MapsPoint([new MapsCoordinate(mapsPoint[0], mapsPoint[1])])
            }
            zoom={zoom}
            center={mapsPoint}
          />
        </View>

        <View style={styles.boxes}>
          <View style={styles.boxIs1}>
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
            style={[styles.boxIs8, styles.button]}>
            <Pressable
              onPress={() => setCurrentGps()}
              style={styles.buttonInner}>
              <MaterialCommunityIcons
                name="map-marker"
                size={30}
                color={brittishPalette.white}
              />

              <Text style={styles.buttonText}>Neem huidige locatie over.</Text>
            </Pressable>
          </View>
          <View style={styles.boxIs1} />
        </View>

        <Opad
          onPressUp={() => setMapsPoint(handleOpad.handleUp(zoom))}
          onPressDown={() => setMapsPoint(handleOpad.handleDown(zoom))}
          onPressMiddle={() => safe()}
          onPressLeft={() => setMapsPoint(handleOpad.handleLeft(zoom))}
          onPressRight={() => setMapsPoint(handleOpad.handleRight(zoom))}
        />

        <View style={styles.boxes}>
          <View style={styles.boxIs1} />
          <View style={styles.boxIs1}>
            <MaterialCommunityIcons
              name="map-search-outline"
              size={35}
              color={colors.main}
            />
          </View>
          <View style={styles.boxIs6}>
            <Slider
              style={styles.slider}
              value={zoom}
              minimumValue={4}
              maximumValue={18}
              minimumTrackTintColor={brittishPalette.darkgray}
              maximumTrackTintColor={brittishPalette.darkgray}
              onValueChange={(value: number) => setZoom(value)}
            />
          </View>
          <View style={styles.boxIs2}>
            <MaterialCommunityIcons
              name="home-search"
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
    backgroundColor: colors.main,
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
    color: brittishPalette.white,
    fontWeight: 'bold',
  },
  slider: {width: '100%', height: 40},
  boxes: {
    marginTop: 12,
    display: 'flex',
    flexWrap: 'nowrap',
    flexDirection: 'row',
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

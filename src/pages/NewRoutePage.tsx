import React, {FC, Fragment, useState} from 'react';
import {
  View,
  Button,
  StyleSheet,
  Text,
  ScrollView,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import Maps from '../components/Maps';
import SelectCoordinate from '../components/SelectCoordinate';
import {MapsLine} from '../core/maps/MapsLine';
import {MapsCoordinate} from '../core/maps/MapsCoordinate';
import {MapsPoint} from '../core/maps/MapsPoints';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../styles/colors';
import Dialog from 'react-native-dialog';

const NewRoutePage: FC = () => {
  const [selectCor, setSelectCor] = useState<boolean>(false);
  const [centerPoint, setCenterPoint] = useState([5.6679899, 52.0430533]);
  const [mapPoints, setMapPoints] = useState<number[][]>([]);
  const [POIArray, setPOIArray] = useState<(number | string)[][]>([]);
  const [POIDialog, setPOIDialog] = useState(false);
  const [currentMapPoint, setCurrentMapPoint] = useState<number[]>([]);
  const [currentPOIName, setCurrentPOIName] = useState<string>('');
  const [currentPOIDescription, setCurrentPOIDescription] = useState<string>(
    '',
  );

  function addCoordinate(coordinate: number[]) {
    setMapPoints([...mapPoints, coordinate]);
    setSelectCor(false);
  }

  const mapCoordinateMapper = () => {
    return mapPoints.map(
      mapPoint => new MapsCoordinate(mapPoint[0], mapPoint[1]),
    );
  };

  const showPOIDialog = (mapPoint: number[]) => {
    setCurrentMapPoint(mapPoint);
    setPOIDialog(true);
  };

  const handleCancel = () => {
    setCurrentMapPoint([]);
    setPOIDialog(false);
  };

  const handleCreatePOI = (name: string, description: string) => {
    //TODO: zorg ervoor dat de POI in de correcte segment komt.
    setPOIArray([
      ...POIArray,
      [
        mapPoints.findIndex(currentPoint => currentPoint === currentMapPoint) +
          1,
        name,
        description,
      ],
    ]);
    setCurrentMapPoint([]);
    setCurrentPOIName('');
    setCurrentPOIDescription('');
    setPOIDialog(false);
  };

  const saveNewRoute = () => {};

  if (selectCor) {
    return (
      <SelectCoordinate
        addCoordinate={addCoordinate}
        cancel={() => {
          setSelectCor(false);
        }}
      />
    );
  } else {
    return (
      <ScrollView>
        <View>
          <Maps
            mapsLine={new MapsLine(mapCoordinateMapper())}
            mapsPoint={new MapsPoint(mapCoordinateMapper())}
            center={centerPoint}
            zoom={13}
          />
        </View>
        <View style={styles.wrapper}>
          {mapPoints.length > 0 && (
            <Text style={styles.title}>Segmenten in routes</Text>
          )}
          {mapPoints.map((mapPoint, index) => {
            return (
              <Fragment key={JSON.stringify(mapPoint)}>
                <TouchableOpacity
                  style={styles.segment}
                  onPress={() => {
                    setCenterPoint([mapPoint[0], mapPoint[1]]);
                  }}>
                  <View style={styles.cardInner}>
                    <View style={styles.heading}>
                      <MaterialCommunityIcons
                        name="map-marker"
                        size={30}
                        color={colors.red}
                      />
                      <View>
                        <Text style={styles.segmentTitle}>
                          Segment {index + 1}
                        </Text>
                      </View>
                    </View>
                    <View>
                      <Text>Lengtegaad: {mapPoint[0]}</Text>
                      <Text>Breedtegraad: {mapPoint[1]}</Text>
                    </View>
                    {!POIArray.find(POI => POI[0] === index + 1) && (
                      <TouchableOpacity
                        style={styles.poiButton}
                        onPress={() => showPOIDialog(mapPoint)}>
                        <Text style={styles.poiButtonText}>
                          Bezienswaardigheid toevoegen
                        </Text>
                      </TouchableOpacity>
                    )}
                    <View style={styles.segmentButton}>
                      <MaterialCommunityIcons
                        name="close-circle-outline"
                        size={24}
                        color={colors.red}
                        onPress={() => {}}
                      />
                    </View>
                  </View>
                  {POIArray.map(POI => {
                    if (POI[0] === index + 1) {
                      return (
                        <View style={styles.poi}>
                          <View key={JSON.stringify(POI[0])}>
                            <View>
                              <View style={styles.poiData}>
                                <MaterialCommunityIcons
                                  name="information"
                                  size={30}
                                  color={colors.darkgray}
                                />
                                <Text style={styles.poiHeading}>{POI[1]}</Text>
                              </View>
                              <Text style={styles.poiDescription}>
                                {POI[2]}
                              </Text>
                              <View
                                style={[styles.poiIcons, styles.poiButtons]}>
                                <MaterialCommunityIcons
                                  name="square-edit-outline"
                                  size={24}
                                  color={colors.primary}
                                  onPress={() => {}}
                                />
                                <MaterialCommunityIcons
                                  name="close-circle-outline"
                                  size={24}
                                  color={colors.red}
                                  onPress={() => {}}
                                />
                              </View>
                            </View>
                          </View>
                        </View>
                      );
                    }
                  })}
                </TouchableOpacity>
              </Fragment>
            );
          })}
        </View>

        <View>
          <Dialog.Container visible={POIDialog}>
            <Dialog.Title>Set a new POI</Dialog.Title>
            <Dialog.Input
              label="Name"
              onChangeText={name => setCurrentPOIName(name)}
            />
            <Dialog.Input
              label="Description"
              onChangeText={description =>
                setCurrentPOIDescription(description)
              }
            />
            <Dialog.Button label="Cancel" onPress={() => handleCancel()} />
            <Dialog.Button
              label="Create"
              onPress={() =>
                handleCreatePOI(currentPOIName, currentPOIDescription)
              }
            />
          </Dialog.Container>
        </View>

        <View style={styles.button}>
          <Button
            title="Een punt toevoegen"
            onPress={() => setSelectCor(true)}
          />
        </View>
        <View style={styles.button}>
          <Button title="Route opslaan" onPress={() => saveNewRoute()} />
        </View>
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    marginVertical: 18,
    fontSize: 20,
    fontWeight: 'bold',
  },
  wrapper: {
    paddingHorizontal: 10,
  },
  segmentButton: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  poiButtons: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
  },
  poi: {
    position: 'relative',
    paddingTop: 10,
    paddingHorizontal: 10,
    borderTopColor: colors.gray,
    borderTopWidth: 1,
  },
  poiData: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  poiDescription: {
    margin: 0,
  },
  poiHeading: {
    fontWeight: '700',
    fontSize: 18,
    marginLeft: 5,
  },
  segment: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    marginBottom: 20,
    paddingBottom: 10,
    borderRadius: 6,
  },
  cardInner: {
    padding: 10,
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  segmentTitle: {
    fontWeight: '700',
    fontSize: 18,
    marginLeft: 5,
  },
  poiIcons: {
    flexDirection: 'row',
  },
  poiButton: {
    backgroundColor: colors.primary,
    padding: 10,
    marginTop: 10,
  },
  poiButtonText: {
    textAlign: 'center',
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

export default NewRoutePage;

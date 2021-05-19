import React, {FC, Fragment, useState} from 'react';
import {
  View,
  Button,
  StyleSheet,
  Text,
  ScrollView,
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
import api from '../core/data/api';
import {TextInput} from 'react-native-gesture-handler';

const NewRoutePage: FC = () => {
  const [selectCoordinate, setSelectCoordinate] = useState<boolean>(false);
  const [centerPoint, setCenterPoint] = useState([5.6679899, 52.0430533]);
  const [mapPoints, setMapPoints] = useState<number[][]>([]);
  const [POIArray, setPOIArray] = useState<(number | string)[][]>([]);
  const [POIDialog, setPOIDialog] = useState(false);
  const [currentMapPoint, setCurrentMapPoint] = useState<number[]>([]);
  const [currentPOIName, setCurrentPOIName] = useState<string>('');
  const [currentPOIDescription, setCurrentPOIDescription] = useState<string>(
    '',
  );
  const [routeName, setRouteName] = useState<String>('');
  const [routeDescription, setRouteDescription] = useState<String>('');
  const [routeDistance, setRouteDistance] = useState<number>();

  const addCoordinate = (coordinate: number[]) => {
    setMapPoints([...mapPoints, coordinate]);
    setSelectCoordinate(false);
  };

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

  const handleDeleteSegment = mapPoint => {
    // TODO: get correct segment id, then remove from state
  };

  const saveNewRoute = async () => {
    // TODO: calculate distance
    const routeInfo = {
      name: routeName,
      description: routeDescription,
      distance: 1,
      segments: [
        // {
        //   startCoordinate: {
        //     latitude: mapPoints[0][1],
        //     longitude: mapPoints[0][0],
        //   },
        //   endCoordinate: {
        // latitude: mapPoints[mapPoints.length - 1][1],
        //     longitude: mapPoints[mapPoints.length - 1][0],
        //   },
        // },
      ],
    };
    const apiOptions = {
      baseUrl: api.baseUrl,
      headers: {
        method: 'POST',
        body: JSON.stringify(routeInfo),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    };

    console.log(routeInfo);
    console.log(mapPoints);

    await fetch(`${api.baseUrl}/routes`, apiOptions)
      .then(response => response.json())
      .then(response => console.log(response));
  };

  if (selectCoordinate) {
    return (
      <SelectCoordinate
        addCoordinate={addCoordinate}
        cancel={() => {
          setSelectCoordinate(false);
        }}
      />
    );
  }

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
                    <Text>Lengtegraad: {mapPoint[0]}</Text>
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
                      onPress={() => {
                        handleDeleteSegment(mapPoint);
                      }}
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
                            <Text style={styles.poiDescription}>{POI[2]}</Text>
                            <View style={[styles.poiIcons, styles.poiButtons]}>
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
          <Dialog.Title>Nieuwe bezienswaardigheid toevoegen</Dialog.Title>
          <Dialog.Input
            label="Naam"
            onChangeText={name => setCurrentPOIName(name)}
          />
          <Dialog.Input
            label="Beschrijving"
            onChangeText={description => setCurrentPOIDescription(description)}
          />
          <Dialog.Button label="Annuleren" onPress={() => handleCancel()} />
          <Dialog.Button
            label="Toevoegen"
            onPress={() =>
              handleCreatePOI(currentPOIName, currentPOIDescription)
            }
          />
        </Dialog.Container>
      </View>
      <View style={styles.button}>
        <Button
          title="Een punt toevoegen"
          onPress={() => setSelectCoordinate(true)}
        />
      </View>
      <View>
        <View>
          <Text>Route naam: </Text>
          <TextInput
            style={styles.inputField}
            onChangeText={name => setRouteName(name)}
          />
        </View>
        <View>
          <Text>Route beschrijving: </Text>
          <TextInput
            style={styles.inputField}
            onChangeText={description => setRouteDescription(description)}
          />
        </View>
      </View>

      <View style={styles.button}>
        <Button title="Route opslaan" onPress={() => saveNewRoute()} />
      </View>
    </ScrollView>
  );
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
  inputField: {
    borderWidth: 1,
  },
});

export default NewRoutePage;

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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../styles/colors';
import Dialog from 'react-native-dialog';
import {PointOfInterest} from '../core/domain/PointOfInterest';
import {Route} from '../core/domain/Route';
import {RouteMapper} from '../core/mapper/RouteMapper';

const NewRoutePage: FC = () => {
  // New
  const [newRoute, setNewRoute] = useState<Route>(new Route(0, '', 0, '', []));

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

  // New
  const addPoint: Function = (coordinates: number[]): void => {
    const route = newRoute;
    route?.addSegment({
      latitude: coordinates[0],
      longitude: coordinates[1],
      altitude: 0,
    });

    setNewRoute(route);
  };

  // New
  const addPOI: Function = (POI: PointOfInterest, segmentId: number): void => {
    const route = newRoute;
    route.segments.map(segment => {
      if (segment.id === segmentId) {
        segment.poi = POI;
      }
    });

    setNewRoute(route);
  };

  const handleCreatePOI = (POI: PointOfInterest) => {
    //TODO: zorg ervoor dat de POI in de correcte segment komt.
    setPOIArray([
      ...POIArray,
      [
        mapPoints.findIndex(currentPoint => currentPoint === currentMapPoint) +
          1,
        POI.name,
        POI.description,
      ],
    ]);
    setCurrentMapPoint([]);
    setCurrentPOIName('');
    setCurrentPOIDescription('');
    setPOIDialog(false);
  };

  if (selectCor) {
    return (
      <SelectCoordinate
        addCoordinate={addPoint}
        cancel={() => setSelectCor(false)}
      />
    );
  }

  return (
    <ScrollView>
      <View>
        <Maps
          mapsLine={RouteMapper.toMapsLine(newRoute) || null}
          mapsPoint={RouteMapper.toMapsPoint(newRoute) || null}
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
                      onPress={() => {
                        setCurrentMapPoint(mapPoint);
                        setPOIDialog(true);
                      }}>
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
                  return (
                    POI[0] === index + 1 && (
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
                    )
                  );
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
          <Dialog.Button
            label="Annuleren"
            onPress={() => setPOIDialog(false)}
          />
          <Dialog.Button
            label="Toevoegen"
            onPress={() =>
              handleCreatePOI({
                name: currentPOIName,
                description: currentPOIDescription,
              })
            }
          />
        </Dialog.Container>
      </View>

      <View style={styles.button}>
        <Button title="Een punt toevoegen" onPress={() => setSelectCor(true)} />
      </View>
      <View style={styles.button}>
        <Button title="Route opslaan" onPress={() => null} />
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
});

export default NewRoutePage;

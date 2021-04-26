import React, { FC, Fragment, useEffect, useState } from 'react';
import { View, Button, StyleSheet, Text, ScrollView, Pressable } from 'react-native';
import Maps from '../components/Maps';
import { Coordinate } from '../core/domain/Coordinate';
import SelectCoordinate from '../components/SelectCoordinate';
import { MapsLine } from '../core/maps/MapsLine';
import { MapsCoordinate } from '../core/maps/MapsCoordinate';
import { MapsPoint } from '../core/maps/MapsPoints';
import GeoData from '../api/GeoData';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../styles/colors';
import Dialog from 'react-native-dialog';

const NewRoutePage: FC = () => {
    const geoData = GeoData.getGeoData();

    const [selectCor, setSelectCor] = useState<boolean>(false);
    const [centerPoint, setCenterPoint] = useState([5.6679899, 52.0430533]);
    const [mapPoints, setMapPoints] = useState([[5.6679899, 52.0430533], [5.664037711124264, 52.04006754102576]]);
    const [POIArray, setPOIArray] = useState([[1, "Kerk", "Een mooie middeleeuwse kerk. Dit is een lange beschrijving van een point of interest."]]);
    const [POIDialog, setPOIDialog] = useState(false);
    const [currentMapPoint, setCurrentMapPoint] = useState([]);
    const [currentPOIName, setCurrentPOIName] = useState("");
    const [currentPOIDescription, setCurrentPOIDescription] = useState("");

    function addCoordinate(coordinate: Coordinate) {
        setSelectCor(false);
    }

    const mapCoordinateMapper = () => {
        return mapPoints.map(mapPoint =>
            new MapsCoordinate(mapPoint[0], mapPoint[1])
        )
    }

    const showPOIDialog = (mapPoint) => {
        setCurrentMapPoint(mapPoint);
        setPOIDialog(true);
    }

    const handleCancel = () => {
        setCurrentMapPoint([]);
        setPOIDialog(false);
    }

    const handleCreatePOI = (name: string, description: string) => {
        //TODO: zorg ervoor dat de POI in de correcte segment komt.
        setPOIArray([...POIArray, [mapPoints.findIndex(currentPoint => currentPoint == currentMapPoint) + 1, name, description]])
        setCurrentMapPoint([]);
        setCurrentPOIName("");
        setCurrentPOIDescription("");
        setPOIDialog(false);
    }


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
        return <ScrollView>
            <View>

                <Maps
                    mapsLine={
                        new MapsLine(mapCoordinateMapper())
                    }
                    mapsPoint={
                        new MapsPoint(mapCoordinateMapper())
                    }
                    center={centerPoint}
                    zoom={13}
                />

            </View>
            {mapPoints.map((mapPoint, index) => {
                return <Fragment key={JSON.stringify(mapPoint)}>
                    <Pressable style={styles.wrapper} onPress={() => {
                        setCenterPoint([
                            mapPoint[0], mapPoint[1]
                        ])
                    }}>
                        <MaterialCommunityIcons
                            name="map-marker"
                            size={30}
                            color={colors.main}
                        />
                        <View style={styles.segmentData}>
                            <Text>Latitude: {mapPoint[1]}{"\n"}</Text>
                            <Text>Longtitude: {mapPoint[0]}{"\n"}</Text>
                        </View>
                        <Pressable style={styles.POIButton} onPress={() => showPOIDialog(mapPoint)}>
                            <View>
                                <Text>Add POI</Text>
                            </View>
                        </Pressable>
                        <View style={styles.button}>
                            <MaterialCommunityIcons
                                name="close-outline"
                                size={30}
                                color={colors.main}
                                onPress={() => {

                                }}
                            />
                        </View>
                    </Pressable>
                    {POIArray.map((POI) => {
                        if (POI[0] == index + 1) {
                            return <View key={JSON.stringify(POI[0])} style={[styles.wrapper, styles.POIWrapper]}>
                                <View style={styles.segmentData}>
                                    <Text>POI nr: {POI[0]}</Text>
                                    <Text>POI name: {POI[1]}</Text>
                                    <Text>POI Description: {POI[2]}</Text>
                                    <View style={styles.POI_Icons}>
                                        <MaterialCommunityIcons
                                            name="pencil"
                                            size={30}
                                            color={colors.main}
                                            onPress={() => {

                                            }}
                                        />
                                        <MaterialCommunityIcons
                                            name="close-outline"
                                            size={30}
                                            color={colors.main}
                                            onPress={() => {

                                            }}
                                        />
                                    </View>
                                </View>
                            </View>
                        }
                    })}
                </Fragment>
            })}

            <View>
                <Dialog.Container visible={POIDialog}>
                    <Dialog.Title>Set a new POI</Dialog.Title>
                    <Dialog.Input label="Name" onChangeText={name => setCurrentPOIName(name)}></Dialog.Input>
                    <Dialog.Input label="Description" onChangeText={description => setCurrentPOIDescription(description)}></Dialog.Input>
                    <Dialog.Button label="Cancel" onPress={() => handleCancel()}></Dialog.Button>
                    <Dialog.Button label="Create" onPress={() => handleCreatePOI(currentPOIName, currentPOIDescription)}></Dialog.Button>
                </Dialog.Container>
            </View>

            <View style={styles.button}>
                <Button title="Een punt toevoegen" onPress={() => { setSelectCor(true) }} />
            </View>
            <View style={styles.button}>
                <Button title="Route opslaan" onPress={() => { }} />
            </View>
        </ScrollView>
    }
}

const styles = StyleSheet.create({
    button: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 25
    },
    wrapper: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        marginHorizontal: 10,
        padding: 5,
        overflow: 'hidden',
        borderRadius: 6,
    },
    POIWrapper: {
        marginBottom: 10,
    },
    segmentNumber: {
        borderWidth: 1,
        borderRadius: 100,
        width: 20,
        height: 20,
        marginRight: 10,
        paddingLeft: 5
    },
    segmentData: {
        flex: 3,
        flexDirection: "column"
    },
    POI_Icons: {
        flexDirection: "row"
    },
    POIButton: {
        backgroundColor: colors.main
    }
})

export default NewRoutePage;

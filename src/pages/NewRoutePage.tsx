import React, { FC, Fragment, useState } from 'react';
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

const NewRoutesPage: FC = () => {
    const geoData = GeoData.getGeoData();

    const [selectCor, setSelectCor] = useState<boolean>(false);
    const [centerPoint, setCenterPoint] = useState([5.6679899, 52.0430533]);
    const [mapPoints, setMapPoints] = useState([[5.6679899, 52.0430533], [5.664037711124264, 52.04006754102576]]);
    const [POIDialog, setPOIDialog] = useState(false);

    function addCoordinate(coordinate: Coordinate) {
        setSelectCor(false);
        console.log(coordinate);
    }

    const mapCoordinateMapper = () => {
        return mapPoints.map(mapPoint =>
            new MapsCoordinate(mapPoint[0], mapPoint[1])
        )
    }

    const createNewPOI = () => {
        return <View>
            <Dialog.Container visible={POIDialog}>
                <Dialog.Title>Set a new POI</Dialog.Title>
                <Dialog.Button label="Cancel" onPress={handleCancel}></Dialog.Button>
                <Dialog.Button label="Create" onPress={handleCreatePOI}></Dialog.Button>

            </Dialog.Container>
        </View>
    }

    const handleCancel = () => {

    }

    const handleCreatePOI = () => {

    }


    if (selectCor) {
        return (
            <View></View>
            // <SelectCoordinate
            //     addCoordinate={addCoordinate}
            //     cancel={() => {
            //         setSelectCor(false);
            //     }}
            // />
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
            {mapPoints.map(mapPoint => {
                return <Pressable style={styles.wrapper} key={JSON.stringify(mapPoint)} onPress={() => {
                    setCenterPoint([
                        mapPoint[0], mapPoint[1]
                    ])
                    console.log(centerPoint)

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
                    <Pressable style={styles.POIButton} onPress={() => setPOIDialog(true)}>
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
            })}
            <View>
                <Text>{geoData[0].segments[0].poi.name}</Text>
                <Text>{geoData[0].segments[0].poi.description}</Text>
            </View>
            <View>
                <Dialog.Container visible={POIDialog}>
                    <Dialog.Title>Set a new POI</Dialog.Title>
                    <Dialog.Input label="Name"></Dialog.Input>
                    <Dialog.Input label="Description"></Dialog.Input>
                    <Dialog.Button label="Cancel" onPress={handleCancel}></Dialog.Button>
                    <Dialog.Button label="Create" onPress={handleCreatePOI}></Dialog.Button>
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
        marginBottom: 10,
        marginHorizontal: 10,
        padding: 5,
        overflow: 'hidden',
        borderRadius: 6,
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
    POIButton: {
        backgroundColor: colors.main
    }
})

export default NewRoutesPage;
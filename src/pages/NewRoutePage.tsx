import React, { FC, Fragment, useState } from 'react';
import { View, Button, StyleSheet, Text, ScrollView, Pressable } from 'react-native';
import Maps from '../components/Maps';
import { Route } from '../core/domain/Route';
import { Segment } from '../core/domain/Segment';
import { MapsLine } from '../core/maps/MapsLine';
import { MapsCoordinate } from '../core/maps/MapsCoordinate';
import { MapsPoint } from '../core/maps/MapsPoints';
import GeoData from '../api/GeoData';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const NewRoutesPage: FC = () => {
    const geoData = GeoData.getGeoData();

    const [currentStart, setCurrentStart] = useState({ latitude: 52.04006754102576, longitude: 5.664037711124264 });
    const [currentEnd, setCurrentEnd] = useState();

    const addSegment = (segment: Segment) => {

    }

    // const addCordinate: Coordinate = (coordinate: Coordinate) => {
    //     setSelectCor(true);
    // }

    return <ScrollView>
        <View>
            <Text>{JSON.stringify(currentStart)}</Text>

            <Maps
                mapsLine={
                    new MapsLine([
                        new MapsCoordinate(geoData[0].segments[0].start.longitude, geoData[0].segments[0].start.latitude),
                        new MapsCoordinate(geoData[0].segments[0].end.longitude, geoData[0].segments[0].end.latitude)
                    ])
                }
                mapsPoint={
                    new MapsPoint([
                        new MapsCoordinate(geoData[0].segments[0].start.longitude, geoData[0].segments[0].start.latitude),
                        new MapsCoordinate(geoData[0].segments[0].end.longitude, geoData[0].segments[0].end.latitude),
                    ])
                }
                center={[currentStart.longitude, currentStart.latitude]}
                zoom={13}
            />

        </View>
        <Pressable style={styles.wrapper} onPress={() => setCurrentStart({
            latitude: geoData[0].segments[0].start.latitude,
            longitude: geoData[0].segments[0].start.longitude
        })}>
            <Text style={styles.segmentNumber}>
                {JSON.stringify(geoData[0].segments[0].id)}
            </Text>
            <Text>Startpunt: </Text>
            <View style={styles.segmentData}>
                <Text>Latitude: {JSON.stringify(geoData[0].segments[0].start.latitude)}{"\n"}</Text>
                <Text>Longtitude: {JSON.stringify(geoData[0].segments[0].start.longitude)}{"\n"}</Text>
                <Text>Altitude: {JSON.stringify(geoData[0].segments[0].start.altitude)}{"\n"}</Text>
            </View>
            <Text>Eindpunt: </Text>
            <View style={styles.segmentData}>
                <Text>Latitude: {JSON.stringify(geoData[0].segments[0].end.latitude)}{"\n"}</Text>
                <Text>Longtitude: {JSON.stringify(geoData[0].segments[0].end.longitude)}{"\n"}</Text>
                <Text>Altitude: {JSON.stringify(geoData[0].segments[0].end.altitude)}{"\n"}</Text>
            </View>
            <View style={styles.button}>
                <MaterialCommunityIcons
                    name="close-outline"
                    size={30}
                    color={"#000000"}
                    onPress={() => {

                    }}
                />
            </View>
        </Pressable>
        <View>
            <Text>{geoData[0].segments[0].poi.name}</Text>
            <Text>{geoData[0].segments[0].poi.description}</Text>
        </View>
        {/* {geoData.map((route: Route) => {  
                route.segments.map((segment: Segment) => {
                    <>
                        <Pressable style={styles.wrapper} onPress={() => setCurrentStart({
                            latitude: segment.start.latitude,
                            longitude: segment.start.longitude
                        })}>
                            <Text style={styles.segmentNumber}>
                                {JSON.stringify(segment.id)}
                            </Text>
                            <Text>Startpunt: </Text>
                            <View style={styles.segmentData}>
                                <Text>Latitude: {JSON.stringify(segment.start.latitude)}{"\n"}</Text>
                                <Text>Longtitude: {JSON.stringify(segment.start.longitude)}{"\n"}</Text>
                                <Text>Altitude: {JSON.stringify(segment.start.altitude)}{"\n"}</Text>
                            </View>
                            <Text>Eindpunt: </Text>
                            <View style={styles.segmentData}>
                                <Text>Latitude: {JSON.stringify(segment.end.latitude)}{"\n"}</Text>
                                <Text>Longtitude: {JSON.stringify(segment.end.longitude)}{"\n"}</Text>
                                <Text>Altitude: {JSON.stringify(segment.end.altitude)}{"\n"}</Text>
                            </View>
                            <View style={styles.button}>
                                <MaterialCommunityIcons
                                    name="close-outline"
                                    size={30}
                                    color={"#000000"}
                                    onPress={() => {

                                    }}
                                />
                            </View>
                        </Pressable>
                        <View>
                            <Text>{segment.poi.name}</Text>
                            <Text>{segment.poi.description}</Text>
                        </View>
                    </>
                });
            })} */}
        <View style={styles.button}>
            <Button title="Een punt toevoegen" onPress={() => { }} />
        </View>
        <View style={styles.button}>
            <Button title="Route opslaan" onPress={() => addSegment} />
        </View>
    </ScrollView>
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
        padding: 15,
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
    }
})

export default NewRoutesPage;
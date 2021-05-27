import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import ProfileUserInfo from '../components/ProfileUserInfo';
import { ActivityMapper } from '../core/mapper/ActivityMapper';

const ProfilePage: React.FC = () => {
  const userData = useSelector(state => state.user);

  //todo: get from back-end
  const activities = [
    {
      routeId: 1,
      userId: userData.username,
      point: 100,
      duration: 50,
      distance: 23,
      segments: [
        {
          endCoordinate: {
            longitude: 5.679981,
            latitude: 52.034237,
            altitude: 27,
          },
          startCoordinate: {
            longitude: 5.679166,
            latitude: 52.030257,
            altitude: 26.0,
          },
        },
        {
          endCoordinate: {
            longitude: 5.3232,
            latitude: 52.565,
            altitude: 21,
          },
          startCoordinate: {
            longitude: 5.55,
            latitude: 52.66,
            altitude: 28.0,
          },
        },
      ],
    },
  ];

  const activityRoutes = ActivityMapper.activityToRoute(activities[0]);

  return (
    <>
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <Image
            style={styles.profileImage}
            source={{uri: userData.imageUrl}}
          />
          <View style={styles.profileUserInfo}>
            <Text style={styles.profileUserName}>{userData.username}#1111</Text>
            <Text style={styles.profileUserEmail}>{userData.emailAddress}</Text>
          </View>
        </View>
        <View style={styles.profileUserStats}>
          <ProfileUserInfo label={'Voornaam: '} value={userData.firstName} />
          <ProfileUserInfo label={'Achternaam: '} value={userData.lastName} />
        </View>
        <View style={styles.profileUserStats}>
          <ProfileUserInfo label={'Totaal gelopen km: '} value={120 + ' km'} />
          <ProfileUserInfo label={'Totale score: '} value={10} />
        </View>
        <View style={styles.activities}>
          <Text style={styles.activitiesHeader}>Laatste activiteiten</Text>
          {/* {activities.map(activity => {
            
          })} */}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 15,
    width: '100%',
  },
  header: {
    marginVertical: 10,
    display: 'flex',
    flexDirection: 'row',
  },
  profileImage: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  profileUserInfo: {
    marginVertical: 5,
    marginLeft: 5,
  },
  profileUserName: {
    fontWeight: 'bold',
  },
  profileUserEmail: {
    fontSize: 12,
  },
  profileUserStats: {
    flexDirection: 'row',
  },
  activities: {},
  activitiesHeader: {
    fontSize: 28,
    fontWeight: 'bold',
  },
});

export default ProfilePage;

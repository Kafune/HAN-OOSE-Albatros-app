import React, {useState, useEffect} from 'react';
import {Image, StyleSheet, Text, View, ScrollView} from 'react-native';
import ProfileUserInfo from '../components/ProfileUserInfo';
import RouteInformation from '../components/RouteInformation';
import {Activity} from '../core/domain/Activity';
import {Route} from '../core/domain/Route';
import {ActivityMapper} from '../core/mapper/ActivityMapper';
import api from '../core/data/api';

type Props = {
  userId: Number;
};
export const Profile: React.FC<Props> = props => {
  useEffect(() => {
    const getData = async () => {
      const request = await fetch(
        (api.baseUrl = '/users/' + props.userId),
        api.headersGet,
      );
      const response = await request.json();
      setUsername(response.username);
      setImageUrl(response.imageURL);
      setFirstName(response.firstName);
      setLastName(response.lastName);
      setEmailAddress(response.emailAddress);
    };

    getData();
  });

  // const userData = useSelector(state => state.user);

  const [username, setUsername] = useState<String>('Laden...');
  const [imageUrl, setImageUrl] = useState<String>(
    'https://lh3.googleusercontent.com/ogw/ADGmqu_e0wq2lSmi26PLd_Oa3yHmala3PclbIxFCX5e9=s32-c-mo',
  );
  const [firstName, setFirstName] = useState<String>('Laden...');
  const [lastName, setLastName] = useState<String>('Laden...');
  const [emailAddress, setEmailAddress] = useState<String>('Laden...');

  const [totalDistance, setTotalDistance] = useState<number>(0);

  let distanceFromActivities: number = 0;

  const activities: Activity[] = [
    new Activity(1, 1, username, 100, 50, 23, [
      {
        id: 1,
        end: {
          longitude: 5.679981,
          latitude: 52.034237,
          altitude: 27,
        },
        start: {
          longitude: 5.679166,
          latitude: 52.030257,
          altitude: 26.0,
        },
      },
    ]),
    new Activity(2, 1, username, 100, 50, 2, []),
    new Activity(3, 1, username, 100, 50, 5, []),
    new Activity(4, 1, username, 100, 50, 12, []),
    new Activity(5, 1, username, 100, 50, 14, []),
  ];

  // TODO: replace dummy with fetch from back-end
  useEffect(
    () => setTotalDistance(distanceFromActivities),
    [distanceFromActivities],
  );

  let activityRoutes: Route[] = ActivityMapper.activitiesToRoutes(activities);

  return (
    <>
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <Image style={styles.profileImage} source={{uri: imageUrl}} />
          <View style={styles.profileUserInfo}>
            <Text style={styles.profileUserName}>{username}#1111</Text>
            <Text style={styles.profileUserEmail}>{emailAddress}</Text>
          </View>
        </View>
        <View style={styles.profileUserStats}>
          <ProfileUserInfo label={'Voornaam: '} value={firstName} />
          <ProfileUserInfo label={'Achternaam: '} value={lastName} />
        </View>
        <View style={styles.profileUserStats}>
          <ProfileUserInfo
            label={'Totaal gelopen km: '}
            value={totalDistance + ' km'}
          />
          <ProfileUserInfo label={'Totale score: '} value={10} />
        </View>
        <ScrollView style={styles.activities}>
          <Text style={styles.activitiesHeader}>Laatste activiteiten</Text>
          {console.log(activityRoutes)}
          {activityRoutes.map(route => {
            distanceFromActivities += route.distance;
            return (
              <RouteInformation
                isActive={false}
                key={route.id}
                route={route}
                onSelectRoute={() => {}}
              />
            );
          })}
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  header: {
    marginHorizontal: 15,
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
  activities: {
    height: 400,
  },
  activitiesHeader: {
    marginHorizontal: 15,
    fontSize: 28,
    fontWeight: 'bold',
  },
});

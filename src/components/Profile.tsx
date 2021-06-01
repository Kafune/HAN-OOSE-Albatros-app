import React, {useState, useEffect} from 'react';
import {Image, StyleSheet, Text, View, ScrollView} from 'react-native';
import ProfileUserInfo from '../components/ProfileUserInfo';
import RouteInformation from '../components/RouteInformation';
import {Activity} from '../core/domain/Activity';
import api from '../core/data/api';
import {ActivityMapper} from '../core/mapper/ActivityMapper';

type Props = {
  user: any;
};
export const Profile: React.FC<Props> = props => {
  const [userId, setUserId] = useState<number>(-1);
  const [username, setUsername] = useState<String>('Laden...');
  const [imageUrl, setImageUrl] = useState<String>(
    'https://lh3.googleusercontent.com/ogw/ADGmqu_e0wq2lSmi26PLd_Oa3yHmala3PclbIxFCX5e9=s32-c-mo',
  );
  const [firstName, setFirstName] = useState<String>('Laden...');
  const [lastName, setLastName] = useState<String>('Laden...');
  const [emailAddress, setEmailAddress] = useState<String>('Laden...');
  const [totalScore, setTotalScore] = useState<number>(-1);
  const [activities, setActivities] = useState<Activity[]>([]);

  const [totalDistance, setTotalDistance] = useState<number>(0);
  let distanceFromActivities: number = 0;

  useEffect(() => {
    const getData = async () => {
      const request = await fetch(
        api.baseUrl +
          '/activities/user/' +
          props.user.userId +
          '?token=' +
          props.user.token,
        api.headersGet,
      );
      const response = await request.json();
      const responseActivities = ActivityMapper.multipleToDomain(response);
      setUserId(props.user.userId);
      setUsername(props.user.username);
      setImageUrl(props.user.imageUrl);
      setFirstName(props.user.firstName);
      setLastName(props.user.lastName);
      setEmailAddress(props.user.emailAddress);
      setTotalScore(props.user.totalScore);
      setActivities(responseActivities);
    };
    const calculateDistance = async () => {
      activities.forEach(activity => {
        console.log((distanceFromActivities += activity.distance));
        distanceFromActivities += activity.distance;
      });
    };

    getData();
    calculateDistance();
  }, [props.user, distanceFromActivities]);

  // useEffect(() => {
  //   const calculateDistance = async () => {
  //     setTotalDistance(distanceFromActivities);
  //   };
  //   calculateDistance();
  // }, [distanceFromActivities]);

  return (
    <>
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <Image style={styles.profileImage} source={{uri: imageUrl}} />
          <View style={styles.profileUserInfo}>
            <Text style={styles.profileUserName}>
              {username}#{userId}
            </Text>
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
            value={totalDistance.toFixed(2) + ' km'}
          />
          <ProfileUserInfo label={'Totale score: '} value={totalScore} />
        </View>
        <ScrollView style={styles.activities}>
          <Text style={styles.activitiesHeader}>Laatste activiteiten</Text>
          {activities.map(activity => {
            return (
              <RouteInformation
                isActive={false}
                key={activity.activityId}
                route={activity}
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
    height: 475,
  },
  activitiesHeader: {
    marginHorizontal: 15,
    fontSize: 28,
    fontWeight: 'bold',
  },
});

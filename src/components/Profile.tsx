import React, {useState, useEffect} from 'react';
import {Image, StyleSheet, Text, View, ScrollView} from 'react-native';
import ProfileUserInfo from '../components/ProfileUserInfo';
import RouteInformation from '../components/RouteInformation';
import {Activity} from '../core/domain/Activity';
import api from '../core/data/api';
import {ActivityMapper} from '../core/mapper/ActivityMapper';
import {useSelector} from 'react-redux';

type Props = {
  user: any;
};
export const Profile: React.FC<Props> = props => {
  const loggedInUser = useSelector(state => state.user);
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    if (props.user) {
      const getData = async () => {
        const request = await fetch(
          api.baseUrl +
            '/activities/user/' +
            props.user[0].userId +
            '?token=' +
            loggedInUser.token,
          api.headersGet,
        );
        const response = await request.json();
        console.log(response);
        const responseActivities = ActivityMapper.multipleToDomain(response);
        setActivities(responseActivities);
      };

      getData();
    }
  }, [loggedInUser.token, props.user]);

  if (props.user) {
    return (
      <>
        <View style={styles.wrapper}>
          <View style={styles.header}>
            <Image
              style={styles.profileImage}
              source={{uri: props.user[0].imageUrl}}
            />
            <View style={styles.profileUserInfo}>
              <Text style={styles.profileUserName}>
                {props.user.username}#{props.user[0].userId}
              </Text>
              <Text style={styles.profileUserEmail}>
                {props.user[0].emailAddress}
              </Text>
            </View>
          </View>
          <View style={styles.profileUserStats}>
            <ProfileUserInfo
              label={'Voornaam: '}
              value={props.user[0].firstName}
              icon={'emoticon-happy-outline'}
            />
            <ProfileUserInfo
              label={'Achternaam: '}
              value={props.user[0].lastName}
              icon={'emoticon-happy-outline'}
            />
          </View>
          <View style={styles.profileUserStats}>
            <ProfileUserInfo
              label={'Totale score: '}
              value={props.user[0].totalScore}
              icon={'run'}
            />
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
  } else {
    return <Text>Loading...</Text>;
  }
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
    marginHorizontal: 15,
    flexDirection: 'row',
  },
  activities: {
    height: 475,
  },
  activitiesHeader: {
    marginVertical: 10,
    marginHorizontal: 15,
    fontSize: 28,
    fontWeight: 'bold',
  },
});

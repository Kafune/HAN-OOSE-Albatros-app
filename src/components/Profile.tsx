import React from 'react';
import {Image, StyleSheet, Text, View, ScrollView} from 'react-native';
import ProfileUserInfo from '../components/ProfileUserInfo';
import RouteInformation from './RouteInformation';

type Props = {
  user: any;
};
export const Profile: React.FC<Props> = props => {
  if (props.user) {
    return (
      <>
        <View style={styles.wrapper}>
          <View style={styles.header}>
            <Image
              style={styles.profileImage}
              source={{uri: props.user.imageUrl}}
            />
            <View style={styles.profileUserInfo}>
              <Text style={styles.profileUserName}>
                {props.user.username}#{props.user.userId}
              </Text>
              <Text style={styles.profileUserEmail}>
                {props.user.emailAddress}
              </Text>
            </View>
          </View>
          <View style={styles.profileUserStats}>
            <ProfileUserInfo
              label={'Voornaam: '}
              value={props.user.firstName}
              icon={'emoticon-happy-outline'}
            />
            <ProfileUserInfo
              label={'Achternaam: '}
              value={props.user.lastName}
              icon={'emoticon-happy-outline'}
            />
          </View>
          <View style={styles.profileUserStats}>
            <ProfileUserInfo
              label={'Totale score: '}
              value={props.user.totalScore}
              icon={'run'}
            />
          </View>
          <ScrollView style={styles.activities}>
            <Text style={styles.activitiesHeader}>Laatste activiteiten</Text>
            {props.user.activities
              ? props.user.activities.map(activity => {
                  return (
                    <RouteInformation
                      isActive={false}
                      key={activity.activityId}
                      route={activity}
                      onSelectRoute={() => {}}
                    />
                  );
                })
              : null}
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

import React from 'react';
import {Image, StyleSheet, Text, View, ScrollView} from 'react-native';
import ProfileUserInfo from '../components/ProfileUserInfo';
import RouteInformation from './RouteInformation';
import colors from '../styles/colors';
import {FollowButtons} from './FollowButtons';

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
            <View style={{alignItems: 'flex-end', width: 175}}>
              <FollowButtons user={props.user} />
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
            <ProfileUserInfo
              label={'Totale score: '}
              value={props.user.totalScore}
              icon={'run'}
            />
          </View>
          <View style={styles.feedWrapper}>
            <Text style={styles.feedText}>Laatste activiteiten</Text>
          </View>
          <ScrollView style={styles.activities}>
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
    backgroundColor: 'white',
  },
  header: {
    marginHorizontal: 15,
    paddingVertical: 10,
    display: 'flex',
    flexDirection: 'row',
    borderBottomWidth: 1,
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
    height: 455,
    marginTop: 16,
  },
  feedWrapper: {
    borderTopWidth: 2,
    borderColor: colors.main,
    marginTop: 32,
  },
  feedText: {
    textAlign: 'center',
    backgroundColor: 'white',
    position: 'absolute',
    width: 165,
    fontStyle: 'italic',
    borderRadius: 100,
    top: -13,
    alignSelf: 'center',
    fontSize: 16,
  },
});

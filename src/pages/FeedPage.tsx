import React, {FC, useCallback, useEffect, useState} from 'react';
import {Image, RefreshControl, StyleSheet, Text, View} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {Activity} from '../components/Activity';
import api from '../core/data/api';
import {setStoreActivities} from '../core/redux/actions/activitiesActions';
import colors from '../styles/colors';
import _ from 'lodash';

const FeedPage: FC = ({navigation}) => {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.user);
  const activities = useSelector(state => state.activities);

  useEffect(() => {
    const getData = async () => {
      const request = await fetch(
        api.baseUrl +
          '/users/' +
          userData.userId +
          '/followee-activities' +
          '?token=' +
          userData.token,
        api.headersGet,
      );
      const response = await request.json();
      if (request.status === 200) {
        dispatch(setStoreActivities(response));
      }
    };

    getData();
  }, [userData.token, userData.userId, dispatch]);

  return (
    <>
      <TouchableOpacity
        style={styles.profileWrapper}
        onPress={() =>
          navigation.navigate('profile', {userId: userData.userId})
        }>
        <Image
          style={styles.profilePicture}
          source={{uri: userData.imageUrl}}
        />
        <View style={styles.profileTextWrapper}>
          <Text style={styles.profileName}>{userData.username}</Text>
          <Text style={styles.profilePoints}>
            totale score: {userData.totalScore}
          </Text>
        </View>
      </TouchableOpacity>
      <View style={styles.feedWrapper}>
        <Text style={styles.feedText}>Activiteiten</Text>
      </View>

      <ScrollView style={styles.scrollViewWrapper}>
        {activities.AllActivities.map(activity => {
          return (
            <Activity
              key={Math.random()}
              navigation={navigation}
              activity={activity}
            />
          );
        })}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  profileWrapper: {
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePicture: {
    width: 82,
    height: 82,
    borderRadius: 100,
  },
  profileTextWrapper: {
    padding: 16,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  profilePoints: {
    fontSize: 14,
  },
  feedWrapper: {
    borderTopWidth: 2,
    borderColor: colors.main,
    marginTop: 16,
  },
  feedText: {
    textAlign: 'center',
    backgroundColor: '#F0F0F1FF',
    position: 'absolute',
    width: 120,
    fontStyle: 'italic',
    borderRadius: 100,
    top: -13,
    alignSelf: 'center',
    fontSize: 16,
  },
  scrollViewWrapper: {
    marginTop: 12,
  },

  grid: {
    flexDirection: 'row',
    padding: 12,
  },
  activityWrapper: {
    margin: 12,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: colors.main,
    backgroundColor: 'white',
  },
  activityUserWrapper: {
    flexDirection: 'row',
  },
  activityImage: {
    width: 48,
    height: 48,
    borderRadius: 100,
    backgroundColor: 'black',
  },
  activityUsername: {
    fontSize: 16,
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 12,
    fontWeight: 'bold',
  },
  activityTime: {
    position: 'absolute',
    right: 16,
    top: 16,
    padding: 0,
  },
  italic: {
    fontStyle: 'italic',
  },
  italicCenterBold: {
    fontStyle: 'italic',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  activityRouteWrapper: {
    textAlign: 'center',
    width: '100%',
    alignItems: 'center',
    padding: 12,
    marginBottom: 16,
  },
  activityRouteHeader: {
    fontSize: 21,
  },
  activityRouteSubheader: {
    fontSize: 16,
    paddingTop: 12,
    fontStyle: 'italic',
  },
});

export default FeedPage;

import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {useSelector} from 'react-redux';
import api from '../core/data/api';
import colors from '../styles/colors';

type Props = {
  navigation: any;
  activity: any;
};

export const Activity: React.FC<Props> = props => {
  const userData = useSelector(state => state.user);
  const [user, setUser] = useState();

  useEffect(() => {
    const getData = async () => {
      const request = await fetch(
        api.baseUrl +
          '/users/get-by-id/' +
          props.activity.userId +
          '?token=' +
          userData.token,
        api.headersGet,
      );
      const response = await request.json();
      setUser(response);
    };

    getData();
  }, [props.activity.userId, userData.token, userData.userId]);

  if (user) {
    return (
      <View key={Math.random()} style={styles.activityWrapper}>
        <View style={styles.grid}>
          <TouchableOpacity
            style={styles.activityUserWrapper}
            onPress={() =>
              props.navigation.navigate('profile', {
                userId: props.activity.userId,
              })
            }>
            <Image style={styles.activityImage} source={{uri: user.imageUrl}} />
            <Text style={styles.activityUsername}>{user.username}</Text>
          </TouchableOpacity>

          <View style={styles.activityTime}>
            <Text style={styles.italic}>{props.activity.date}</Text>
          </View>
        </View>

        <View style={styles.activityRouteWrapper}>
          <Text style={styles.activityRouteHeader}>
            Heeft een route gelopen
          </Text>
          <Text style={styles.activityRouteSubheader}>
            {props.activity.distance}km - {props.activity.point} punten
          </Text>
        </View>
      </View>
    );
  } else {
    return <Text>Loading...</Text>;
  }
};

const styles = StyleSheet.create({
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
    top: 26,
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

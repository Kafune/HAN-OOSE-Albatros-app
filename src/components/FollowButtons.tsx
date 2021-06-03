import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import api from '../core/data/api';
import colors from '../styles/colors';

type Props = {
  user: any;
};

export const FollowButtons: React.FC<Props> = props => {
  const userData = useSelector(state => state.user);
  const [followed, setFollowed] = useState(false);

  useEffect(() => {
    const checkFollows = async () => {
      const request = await fetch(
        api.baseUrl +
          '/users/' +
          userData.userId +
          '/is-following/' +
          props.user.userId +
          '?token=' +
          userData.token,
        api.headersGet,
      );
      const response = await request.json();
      setFollowed(response);
    };

    checkFollows();
  }, [props.user, userData.token, userData.userId]);

  const followRequest = async () => {
    await fetch(
      api.baseUrl +
        '/users/' +
        userData.userId +
        '/follows/' +
        props.user.userId +
        '?token=' +
        userData.token,
      api.headersPost(1),
    ).then(response => {
      console.log(response);
      if (response.status === 200) {
        setFollowed(true);
      } else if (response.status === 400) {
        setFollowed(false);
      }
    });
  };

  const unFollowRequest = async () => {
    await fetch(
      api.baseUrl +
        '/users/' +
        userData.userId +
        '/follows/' +
        props.user.userId +
        '?token=' +
        userData.token,
      api.headersDelete,
    ).then(response => {
      console.log(response);
      if (response.status === 200) {
        setFollowed(false);
      }
    });
  };

  if (userData.userId === props.user.userId) {
    return <></>;
  } else {
    if (followed) {
      return (
        <TouchableOpacity
          style={[styles.button, styles.red]}
          onPress={() => unFollowRequest()}>
          <View>
            <Text style={styles.greenText}>Unfollow</Text>
          </View>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={[styles.button, styles.green]}
          onPress={() => followRequest()}>
          <View>
            <Text style={styles.greenText}>Follow</Text>
          </View>
        </TouchableOpacity>
      );
    }
  }
};

const styles = StyleSheet.create({
  button: {
    padding: 8,
    paddingHorizontal: 16,
    borderRadius: 24,
    marginTop: 4,
    alignItems: 'flex-end',
  },
  green: {
    color: 'white',
    backgroundColor: colors.main,
  },
  red: {
    color: 'white',
    backgroundColor: 'red',
  },
  greenText: {
    color: 'white',
  },
});

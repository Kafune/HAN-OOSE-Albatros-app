import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

import {Profile} from '../components/Profile';
import api from '../core/data/api';

const ProfilePage: React.FC = ({route, navigation}) => {
  const userData = useSelector(state => state.user);
  const [userIdData, setUserIdData] = useState();

  const paramUserId = route.params ? route.params.userId : userData.userId;

  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', e => {
      e.preventDefault();
      navigation.navigate('profile', {userId: userData.userId});
    });
    return unsubscribe;
  }, [navigation, userData.userId]);

  useEffect(() => {
    const getData = async () => {
      const request = await fetch(
        api.baseUrl +
          '/users/get-by-id/' +
          (paramUserId === userData.userId ? userData.userId : paramUserId) +
          '?token=' +
          userData.token,
        api.headersGet,
      );
      const response = await request.json();
      // console.log(response);
      setUserIdData(response);
    };

    getData();
  }, [paramUserId, userData.token, userData.userId]);

  return <Profile user={userIdData} />;
};

export default ProfilePage;

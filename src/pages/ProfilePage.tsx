import React, {useEffect, useState} from 'react';
import { Text } from 'react-native-elements';
import {useSelector} from 'react-redux';

import {Profile} from '../components/Profile';
import api from '../core/data/api';

const ProfilePage: React.FC = ({route, navigation}) => {
  const userData = useSelector(state => state.user);
  const [userIdData, setUserIdData] = useState();

  useEffect(() => {
    const getData = async () => {
      const request = await fetch(
        api.baseUrl +
          '/users/find/' +
          route.params.username +
          '?token=' +
          userData.token,
        api.headersGet,
      );
      const response = await request.json();
      setUserIdData(response);
    };

    getData();
  }, [route.params.username, userData.token]);

  if (route.params.username === userData.username) {
    console.log('yepp');
    return <Profile user={userData} />;
  } else {
    console.log(userIdData);

    return <Profile user={userIdData} />;
  }
};

export default ProfilePage;

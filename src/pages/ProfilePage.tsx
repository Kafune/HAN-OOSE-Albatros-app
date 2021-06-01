import React, {useEffect, useState} from 'react';
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
    return <Profile user={{0: {...userData}}} />;
  } else {
    return <Profile user={userIdData} />;
  }
};

export default ProfilePage;

import React from 'react';
import {useSelector} from 'react-redux';

import {Profile} from '../components/Profile';

const ProfilePage: React.FC = () => {
  const userData = useSelector(state => state.user);
  return <Profile user={userData} />;
};

export default ProfilePage;
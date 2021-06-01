import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {brittishPalette} from '../styles/colors';

interface Props {
  label: String;
  value: any;
  icon: string;
}

const ProfileUserInfo: React.FC<Props> = ({
  label,
  value,
  icon,
}): JSX.Element => {
  const size = 24;
  return (
    <View style={styles.wrapper}>
      <MaterialCommunityIcons
        name={icon}
        size={size}
        color={colors.iconColor}
        style={styles.icon}
      />
      <Text>{label}</Text>
      <Text>{value}</Text>
    </View>
  );
};

const colors = {
  iconColor: brittishPalette.naval,
};

const styles = StyleSheet.create({
  wrapper: {
    width: '33%',
    padding: 10,
    display: 'flex',
  },
  icon: {
    alignSelf: 'flex-start',
  },
});

export default ProfileUserInfo;

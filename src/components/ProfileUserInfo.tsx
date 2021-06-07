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
  const size = 42;
  return (
    <View style={styles.wrapper}>
      <MaterialCommunityIcons
        name={icon}
        size={size}
        color={colors.iconColor}
        style={styles.icon}
      />

      <Text style={styles.titletext}>{label}</Text>
      <Text style={styles.subtext}>{value}</Text>
    </View>
  );
};

const colors = {
  iconColor: brittishPalette.green,
};

const styles = StyleSheet.create({
  wrapper: {
    width: '33%',
    padding: 10,
    display: 'flex',
  },
  icon: {
    alignSelf: 'center',
  },
  titletext: {
    textAlign: 'center',
    fontStyle: 'italic',
    opacity: 0.35,
  },
  subtext: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 6,
    fontWeight: 'bold',
  },
});

export default ProfileUserInfo;

import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface Props {
  label: String;
  value: any;
}

const ProfileUserInfo: React.FC<Props> = ({label, value}): JSX.Element => {
  return (
    <View style={styles.wrapper}>
      <Text>{label}</Text>
      <Text>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '50%',
    marginVertical: 5,
    padding: 10,
  },
});

export default ProfileUserInfo;

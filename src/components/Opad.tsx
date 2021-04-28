import React, {FunctionComponent} from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../styles/colors';

type Props = {
  onPressUp: Function;
  onPressDown: Function;
  onPressMiddle: Function;
  onPressLeft: Function;
  onPressRight: Function;
};
export const Opad: FunctionComponent<Props> = props => {
  return (
    <View style={styles.container}>
      <View style={styles.box} />
      <Pressable
        key={'OpadUp'}
        onPress={() => props.onPressUp()}
        style={styles.box}>
        <MaterialCommunityIcons
          name="arrow-up"
          size={size}
          color={colors.gray}
        />
      </Pressable>
      <View style={styles.box} />

      <Pressable
        key={'OpadLeft'}
        onPress={() => props.onPressLeft()}
        style={styles.box}>
        <MaterialCommunityIcons
          name="arrow-left"
          size={size}
          color={colors.gray}
        />
      </Pressable>
      <Pressable
        key={'OpadMiddle'}
        onPress={() => props.onPressMiddle()}
        style={styles.box}>
        <MaterialCommunityIcons name="floppy" size={50} color={colors.gray} />
      </Pressable>
      <Pressable
        key={'OpadRight'}
        onPress={() => props.onPressRight()}
        style={styles.box}>
        <MaterialCommunityIcons
          name="arrow-right"
          size={size}
          color={colors.gray}
        />
      </Pressable>
      <View style={styles.box} />
      <Pressable
        key={'OpadDown'}
        onPress={() => props.onPressDown()}
        style={styles.box}>
        <MaterialCommunityIcons
          name="arrow-down"
          size={size}
          color={colors.gray}
        />
      </Pressable>
      <View style={styles.box} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    margin: '10%',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    backgroundColor: colors.darkgray,
    borderRadius: 100,
  },
  box: {
    minHeight: 100,
    minWidth: '26.6%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const size = 55;

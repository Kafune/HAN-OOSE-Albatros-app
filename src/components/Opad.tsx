import React, {FunctionComponent} from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import colors2 from '../styles/colors';
import {brittishPalette} from '../styles/colors';

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
          color={colors.buttonColor}
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
          color={colors.buttonColor}
        />
      </Pressable>
      <Pressable
        key={'OpadMiddle'}
        onPress={() => props.onPressMiddle()}
        style={styles.box}>
        <MaterialCommunityIcons
          name="floppy" //arrow-expand"
          size={50}
          color={colors.buttonColor}
        />
      </Pressable>
      <Pressable
        key={'OpadRight'}
        onPress={() => props.onPressRight()}
        style={styles.box}>
        <MaterialCommunityIcons
          name="arrow-right"
          size={size}
          color={colors.buttonColor}
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
          color={colors.buttonColor}
        />
      </Pressable>
      <View style={styles.box} />
    </View>
  );
};
//Not so real malkander boys:
// const colors = {buttonColor: '#333333', background: '#ccc'};
//brittishPalette boys:
const colors = {
  buttonColor: brittishPalette.gray,
  background: brittishPalette.darkgray,
};
//Real malkander boys:
// const colors = {buttonColor: colors2.secondary, background: colors2.main};

const styles = StyleSheet.create({
  container: {
    margin: '10%',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    backgroundColor: colors.background,
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

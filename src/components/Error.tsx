import React, {FunctionComponent, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {brittishPalette} from '../styles/colors';

type Props = {
  errorCode: Number;
  message: string | undefined;
};

/**
 * Error message bar.
 * @prop {Number} errorCode
 * @prop {string | undefined} message
 * @param {*} props
 * @return {JSX}
 */
export const Error: FunctionComponent<Props> = props => {
  const [messageBackgroundColor, setMsgBGC] = useState<string>(
    brittishPalette.darkgray,
  );

  const setBackgroundColor = (color: string) => {
    if (messageBackgroundColor !== color) {
      setMsgBGC(color);
    }
  };

  const styles = StyleSheet.create({
    container: {
      padding: '5%',
      backgroundColor: messageBackgroundColor,
      borderRadius: 5,
      margin: '2%',
    },
    baseText: {
      fontSize: 20,
      color: brittishPalette.white,
    },
    boxes: {
      display: 'flex',
      flexWrap: 'nowrap',
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
  });

  const createBody = (icon: String, message: string) => {
    return (
      <View style={styles.boxes}>
        <MaterialCommunityIcons
          // @ts-ignore, Because it also works with a string but ESLint wants a Icon
          name={icon}
          size={20}
          color={brittishPalette.white}
        />
        <Text style={styles.baseText}>{message}</Text>
      </View>
    );
  };

  const handler = (code: Number, message: string | undefined) => {
    switch (code) {
      case 200:
        setBackgroundColor(brittishPalette.green);
        return (
          <>{createBody('check-outline', message ?? 'Alles is goed gegaan')}</>
        );
      case 201:
        setBackgroundColor(brittishPalette.green);
        return <>{createBody('content-save', message ?? 'Aangemaakt!')}</>;
      case 400:
        setBackgroundColor(brittishPalette.red);
        return (
          <>{createBody('file-search', message ?? 'Er is is mis gegaan')}</>
        );
      case 401:
        setBackgroundColor(brittishPalette.red);
        return (
          <>
            {createBody(
              'shield-lock',
              message ?? 'U heeft hier geen toegang tot',
            )}
          </>
        );
      case 403:
        setBackgroundColor(brittishPalette.red);
        return (
          <>
            {createBody(
              'shield-lock',
              message ?? 'U heeft hier geen toegang tot',
            )}
          </>
        );
      case 404:
        setBackgroundColor(brittishPalette.red);
        return (
          <>
            {createBody('file-search', message ?? 'We kunnen dit niet vinden')}
          </>
        );
      case 500:
        setBackgroundColor(brittishPalette.yellow);
        return (
          <>
            {createBody(
              'server-network-off',
              message ?? 'We kunnen de server niet bereiken',
            )}
          </>
        );
      case 503:
        setBackgroundColor(brittishPalette.yellow);
        return (
          <>
            {createBody(
              'access-point-network-off',
              message ?? 'Kan geen verbinding maken',
            )}
          </>
        );
      default:
        setBackgroundColor(brittishPalette.yellow);
        return (
          <>{createBody('alert-box', message ?? 'Er is iets misgegaan')}</>
        );
    }
  };

  return (
    <View style={styles.container}>
      {handler(props.errorCode, props.message)}
    </View>
  );
};

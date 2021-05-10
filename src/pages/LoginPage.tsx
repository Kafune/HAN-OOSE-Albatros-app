import React, {FC, useEffect, useState} from 'react';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {StyleSheet, Text, View} from 'react-native';

const LoginPage: FC = ({navigation}) => {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['profile', 'email'],
      offlineAccess: true,
      webClientId:
        '1049362913814-q6jn7e7k3cakgmfk6522i9tpbetcv4h7.apps.googleusercontent.com',
    });
  }, []);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const googleUserInfo = await GoogleSignin.signIn();
      setUserInfo(googleUserInfo);

      //Testing console log
      console.log(googleUserInfo);

      // Navigate to app page
      navigation.navigate('app');
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('sign in cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('play services not available');
      } else {
        console.log('something else happened', error);
      }
    }
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.imageWrapper}>
        <Text style={styles.runConnectText}>RunConnect</Text>
      </View>
      <View>
        <View>
          <Text style={styles.slogan}>Samen in Beweging</Text>
        </View>
        <GoogleSigninButton
          style={{width: 192, height: 48}}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={signIn}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageWrapper: {
    height: '75%',
  },
  runConnectText: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  slogan: {
    fontSize: 18,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 32,
  },
});

export default LoginPage;

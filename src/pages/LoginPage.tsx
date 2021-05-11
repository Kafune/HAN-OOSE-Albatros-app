import React, {FC, useEffect, useState} from 'react';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {StyleSheet, Text, View} from 'react-native';
import api from '../core/data/api';

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

      const newData = {
        firstName: googleUserInfo.user.givenName,
        lastName: googleUserInfo.user.familyName,
        emailAddress: googleUserInfo.user.email,
        username: googleUserInfo.user.name,
        googleId: googleUserInfo.idToken,
        imageUrl: googleUserInfo.user.photo,
      };

      await fetch(`${api.baseUrl}/registration`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
      }).then(result => {
        //save data in state
        setUserInfo(result);

        //testing console.log
        console.log(result);

        //send user to navigation
        navigation.navigate('app');
      });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('sign in cancelled: ', error);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('in progress: ', error);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('play services not available: ', error);
      } else {
        console.log('something else happened: ', error);
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
          style={styles.googleSignIn}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Light}
          onPress={signIn}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  googleSignIn: {
    width: 225,
    height: 52,
  },
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

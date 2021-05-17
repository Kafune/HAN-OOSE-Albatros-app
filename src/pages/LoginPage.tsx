import React, {FC, useEffect} from 'react';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {StyleSheet, Text, View} from 'react-native';
import api from '../core/data/api';
import {useDispatch} from 'react-redux';
import {setStoreUser} from '../core/redux/actions/userActions';
import {SliderBox} from 'react-native-image-slider-box';

const LoginPage: FC = ({navigation}) => {
  const dispatch = useDispatch();

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
        if (result.status === 200 || result.status === 201) {
          dispatch(setStoreUser(newData));
          navigation.navigate('app');
        }
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
        <SliderBox
          disableOnPress
          sliderBoxHeight={'100%'}
          images={[
            'https://www.malkander-ede.nl/bestanden/Bibliotheek/Malkander/Headers/w1700-1591-2/Jeugdenjongeren-jongerenwerk.jpg',
            'https://www.malkander-ede.nl/bestanden/Bibliotheek/Malkander/Headers/Headers-corporate-merken/Thuis-en-buurt/w1700-2831-1/Headers_Thuis_en_Buurt_3.jpg',
            'https://www.malkander-ede.nl/bestanden/Bibliotheek/Malkander/Headers/Headers-corporate-merken/Thuis-en-buurt/w1700-2834-1/Headers_Thuis_en_Buurt_7.jpg',
          ]}
        />
      </View>
      <View style={styles.buttonWrapper}>
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
    top: '25%',
  },
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageWrapper: {
    height: '50%',
  },
  runConnectText: {
    fontSize: 32,
    padding: 12,
    marginBottom: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  slogan: {
    fontSize: 18,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 32,
    marginTop: 16,
  },
  buttonWrapper: {
    top: '15%',
    height: '25%',
  },
});

export default LoginPage;

import React, {useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

const ProfilePage: React.FC = () => {
  return (
    <>
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <Image
            style={styles.profileImage}
            source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}
          />
          <View style={styles.profileUserInfo}>
            <Text style={styles.profileUserName}>Gebruikers naam #1111</Text>
            <Text style={styles.profileUserEmail}>Mailadres</Text>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
  },
  header: {
    marginVertical: 10,
    display: 'flex',
    flexDirection: 'row',
  },
  profileImage: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  profileUserInfo: {
    marginVertical: 5,
    marginLeft: 5,
  },
  profileUserName: {
    fontWeight: 'bold',
  },
  profileUserEmail: {
    fontSize: 12,
  },
});

export default ProfilePage;

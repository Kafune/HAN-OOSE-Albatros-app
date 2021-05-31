import React, {FC} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';

const FeedPage: FC = () => {
  const userData = useSelector(state => state.user);

  return (
    <>
      <TouchableOpacity
        style={styles.profileWrapper}
        onPress={() => console.log(true)}>
        <Image
          style={styles.profilePicture}
          source={{uri: userData.imageUrl}}
        />
        <View style={styles.profileTextWrapper}>
          <Text style={styles.profileName}>{userData.username}</Text>
          <Text style={styles.profilePoints}>100 Punten</Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  profileWrapper: {
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePicture: {
    width: 82,
    height: 82,
    borderRadius: 100,
  },
  profileTextWrapper: {
    padding: 16,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  profilePoints: {
    fontSize: 14,
  },
});

export default FeedPage;

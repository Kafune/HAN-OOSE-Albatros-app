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
      <View style={styles.feedWrapper}>
        <Text style={styles.feedText}>Activiteiten</Text>
      </View>
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
  feedWrapper: {
    borderTopWidth: 2,
    marginTop: 16,
  },
  feedText: {
    textAlign: 'center',
    backgroundColor: '#F0F0F1FF',
    position: 'absolute',
    width: 120,
    fontStyle: 'italic',
    borderRadius: 100,
    top: -13,
    alignSelf: 'center',
    fontSize: 16,
  },
});

export default FeedPage;

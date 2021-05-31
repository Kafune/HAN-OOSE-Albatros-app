import React, {FC} from 'react';
import {Image, StyleSheet, Text, Touchable, View} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
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

      <ScrollView style={styles.scrollViewWrapper}>
        <View style={styles.activityWrapper}>
          <TouchableOpacity
            style={styles.activityUserWrapper}
            onPress={() => console.log(true)}>
            <Image
              style={styles.activityImage}
              source={{uri: userData.imageUrl}}
            />
            <Text style={styles.activityUsername}>{userData.username}</Text>
          </TouchableOpacity>

          <View style={styles.activityTime}>
            <Text style={styles.italic}>Vandaag</Text>
            <Text style={styles.italicCenterBold}>11:10</Text>
          </View>
        </View>
      </ScrollView>
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
  scrollViewWrapper: {
    marginTop: 12,
  },

  activityWrapper: {
    flexDirection: 'row',
    padding: 6,
    margin: 12,
    borderWidth: 1,
    backgroundColor: 'white',
  },
  activityUserWrapper: {
    flexDirection: 'row',
  },
  activityImage: {
    width: 48,
    height: 48,
    borderRadius: 100,
  },
  activityUsername: {
    fontSize: 16,
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 12,
    fontWeight: 'bold',
  },
  activityTime: {
    position: 'absolute',
    right: 16,
    padding: 12,
  },
  italic: {
    fontStyle: 'italic',
  },
  italicCenterBold: {
    fontStyle: 'italic',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default FeedPage;

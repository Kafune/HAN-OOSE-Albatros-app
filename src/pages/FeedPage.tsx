import React, {FC} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import colors from '../styles/colors';

const FeedPage: FC = ({navigation}) => {
  const userData = useSelector(state => state.user);
  return (
    <>
      <TouchableOpacity
        style={styles.profileWrapper}
        onPress={() =>
          navigation.navigate('profile', {userId: userData.userId})
        }>
        <Image
          style={styles.profilePicture}
          source={{uri: userData.imageUrl}}
        />
        <View style={styles.profileTextWrapper}>
          <Text style={styles.profileName}>{userData.username}</Text>
          <Text style={styles.profilePoints}>
            totale score: {userData.totalScore}
          </Text>
        </View>
      </TouchableOpacity>
      <View style={styles.feedWrapper}>
        <Text style={styles.feedText}>Activiteiten</Text>
      </View>

      <ScrollView style={styles.scrollViewWrapper}>
        <View style={styles.activityWrapper}>
          <View style={styles.grid}>
            <TouchableOpacity
              style={styles.activityUserWrapper}
              onPress={() => navigation.navigate('profile', {userId: 2})}>
              <Image style={styles.activityImage} source={{uri: ''}} />
              <Text style={styles.activityUsername}>Bart Simpson</Text>
            </TouchableOpacity>

            <View style={styles.activityTime}>
              <Text style={styles.italic}>Vandaag</Text>
              <Text style={styles.italicCenterBold}>11:10</Text>
            </View>
          </View>

          <View style={styles.activityRouteWrapper}>
            <Text style={styles.activityRouteHeader}>
              Heeft de route ... gelopen
            </Text>
            <Text style={styles.activityRouteSubheader}>15km - 100 punten</Text>
          </View>
        </View>

        <View style={styles.activityWrapper}>
          <View style={styles.grid}>
            <TouchableOpacity
              style={styles.activityUserWrapper}
              onPress={() => navigation.navigate('profile', {userId: 3})}>
              <Image style={styles.activityImage} source={{uri: ''}} />
              <Text style={styles.activityUsername}>Bart Simpson</Text>
            </TouchableOpacity>

            <View style={styles.activityTime}>
              <Text style={styles.italic}>Vandaag</Text>
              <Text style={styles.italicCenterBold}>11:10</Text>
            </View>
          </View>

          <View style={styles.activityRouteWrapper}>
            <Text style={styles.activityRouteHeader}>
              Heeft de route ... gelopen
            </Text>
            <Text style={styles.activityRouteSubheader}>15km - 100 punten</Text>
          </View>
        </View>

        <View style={styles.activityWrapper}>
          <View style={styles.grid}>
            <TouchableOpacity
              style={styles.activityUserWrapper}
              onPress={() => console.log(true)}>
              <Image style={styles.activityImage} source={{uri: ''}} />
              <Text style={styles.activityUsername}>Bart Simpson</Text>
            </TouchableOpacity>

            <View style={styles.activityTime}>
              <Text style={styles.italic}>Vandaag</Text>
              <Text style={styles.italicCenterBold}>11:10</Text>
            </View>
          </View>

          <View style={styles.activityRouteWrapper}>
            <Text style={styles.activityRouteHeader}>
              Heeft de route ... gelopen
            </Text>
            <Text style={styles.activityRouteSubheader}>15km - 100 punten</Text>
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
    borderColor: colors.main,
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

  grid: {
    flexDirection: 'row',
    padding: 12,
  },
  activityWrapper: {
    margin: 12,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: colors.main,
    backgroundColor: 'white',
  },
  activityUserWrapper: {
    flexDirection: 'row',
  },
  activityImage: {
    width: 48,
    height: 48,
    borderRadius: 100,
    backgroundColor: 'black',
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
    top: 16,
    padding: 0,
  },
  italic: {
    fontStyle: 'italic',
  },
  italicCenterBold: {
    fontStyle: 'italic',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  activityRouteWrapper: {
    textAlign: 'center',
    width: '100%',
    alignItems: 'center',
    padding: 12,
    marginBottom: 16,
  },
  activityRouteHeader: {
    fontSize: 21,
  },
  activityRouteSubheader: {
    fontSize: 16,
    paddingTop: 12,
    fontStyle: 'italic',
  },
});

export default FeedPage;

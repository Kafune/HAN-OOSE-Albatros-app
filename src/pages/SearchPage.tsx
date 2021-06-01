import React, {FC, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SearchBar} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import api from '../core/data/api';
import colors from '../styles/colors';

const SearchPage: FC = () => {
  const user = useSelector(state => state.user);
  const [search, setSearch] = useState('');
  const [searchedData, setSearchedData] = useState();

  const searchUsers = async () => {
    const request = await fetch(
      api.baseUrl + '/users/find/' + search + '?token=' + user.token,
      api.headersGet,
    );

    const response = await request.json();
    setSearchedData(response);
  };

  return (
    <>
      <SearchBar
        platform="android"
        searchIcon={{size: 24}}
        onChangeText={text => setSearch(text)}
        onSubmitEditing={() => searchUsers()}
        onClear={() => setSearch('')}
        placeholder="Zoeken naar gebruikersnaam..."
        style={{fontSize: 16}}
        value={search}
      />
      <ScrollView style={{marginTop: 16}}>
        <Text style={styles.foundUsersHeader}>Gevonden gebruikers:</Text>
        {searchedData ? (
          searchedData.map(info => {
            console.log(info);
            return (
              <TouchableOpacity
                key={info.emailAddress}
                onPress={() => console.log(true)}
                style={styles.activityWrapper}>
                <View style={styles.grid}>
                  <View style={styles.activityUserWrapper}>
                    <Image
                      style={styles.activityImage}
                      source={{uri: info.imageUrl}}
                    />
                    <View>
                      <Text style={styles.activityUsername}>
                        {info.username}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })
        ) : (
          <Text style={styles.foundUsersSubtext}>
            Er zijn geen gebruikers gevonden met deze gebruikersnaam.
          </Text>
        )}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
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
  foundUsersHeader: {
    marginTop: 32,
    marginHorizontal: 16,
    fontSize: 16,
    fontWeight: 'bold',
  },
  foundUsersSubtext: {
    marginTop: 6,
    marginHorizontal: 16,
    fontSize: 16,
  },
});

export default SearchPage;

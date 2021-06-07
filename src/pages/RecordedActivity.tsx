import React, {useState} from 'react';
import {View, StyleSheet, Text, Pressable} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import Maps from '../components/Maps';
import colors, {brittishPalette} from '../styles/colors';
import {RouteMapper} from '../core/mapper/RouteMapper';
import {MapsPoint} from '../core/maps/MapsPoints';
import {ActivityController} from '../core/controller/ActivityController';
import {ActivityMapper} from '../core/mapper/ActivityMapper';
import Dialog from 'react-native-dialog';
import {Duration} from '../core/maps/Duration';
import {setStoreWalkedRoute} from '../core/redux/actions/walkedRouteActions';
import _ from 'lodash';
import {SafeAsRouteForm} from '../components/SafeAsRouteForm';
import { setStorePoints } from '../core/redux/actions/userActions';

type props = {
  navigation: {reset?: any; navigate?: (arg0: string, arg1: any) => void};
};

const RecordedActivity: React.FC<props> = props => {
  const dispatch = useDispatch();
  const recordedActivityState = useSelector(state => state.walkedRoute);
  const [removeDialog, setRemoveDialog] = useState<boolean>(false);
  const [showSafeAsRouteDialog, SetShowSafeAsRouteDialog] =
    useState<boolean>(false);
  const user = useSelector(state => state.user);

  const safeActivity = () => {
    const dto = ActivityMapper.toDTO(recordedActivityState);
    dto.point = user.totalScore + recordedActivityState.point;
    dto.point = Number(dto.point.toFixed());
    dto.userId = user.userId;
    ActivityController.post(dto, user.token).then(() => {
      dispatch(setStorePoints(dto.point));
      // Return back to the main page when saved.
      props.navigation.reset({
        index: 0,
        routes: [{name: 'app'}],
      });
    });
  };

  if (_.isEmpty(recordedActivityState)) {
    return <></>;
  }
  return (
    <>
      <SafeAsRouteForm
        navigation={props.navigation}
        showDialog={showSafeAsRouteDialog}
        close={() => SetShowSafeAsRouteDialog(false)}
        oplsaanAlsActiviteit={() => safeActivity()}
        activity={recordedActivityState}
        token={user.token}
      />
      <Dialog.Container visible={removeDialog}>
        <Dialog.Title>Gelopen route verwijderen</Dialog.Title>
        <Dialog.Description>
          Weet je zeker dat je de gelopen route wilt verwijderen?
        </Dialog.Description>
        <Dialog.Button
          label="Verwijderen"
          onPress={() => {
            setRemoveDialog(false);
            props.navigation.reset({
              index: 0,
              routes: [{name: 'app'}],
            });
            dispatch(setStoreWalkedRoute(null));
          }}
        />
        <Dialog.Button
          label="Annuleren"
          onPress={() => setRemoveDialog(false)}
        />
      </Dialog.Container>
      <View style={styles.page}>
        <View>
          <Text style={styles.headerText}>Gelopen Route</Text>
        </View>
        <View style={styles.container}>
          {!_.isEmpty(recordedActivityState) ? (
            <Maps
              mapsPoint={new MapsPoint([])}
              mapsLine={RouteMapper.toMapsLine(recordedActivityState)}
              zoom={14}
              center={recordedActivityState.middlePoint}
            />
          ) : null}
        </View>

        <View style={styles.activityGrid}>
          <View style={styles.activityItem}>
            <View>
              <Text style={styles.activityHeaderText}>Route Naam:</Text>
              <Text style={styles.activityItemText}>
                {recordedActivityState.name}
              </Text>
            </View>
            <View>
              <Text style={styles.activityHeaderText}>Afstand:</Text>
              <Text style={styles.activityItemText}>
                {recordedActivityState.distance.toString().substring(0, 4)} km
              </Text>
            </View>
          </View>

          <View style={styles.activityItem}>
            <View>
              <Text style={styles.activityHeaderText}>Gelopen Tijd:</Text>
              <Text style={styles.activityItemText}>
                {new Duration(recordedActivityState.duration).getHMS()}
              </Text>
            </View>
            <View>
              <Text style={styles.activityHeaderText}>Tempo:</Text>
              <Text style={styles.activityItemText}>
                {(
                  recordedActivityState.distance /
                  (recordedActivityState.duration / 1000 / 60 / 60)
                ).toFixed(2)}{' '}
                km/u
              </Text>
            </View>
          </View>
        </View>

        <View>
          <View style={styles.scoreWrapper}>
            <Text style={styles.scoreText}>Score</Text>
            <Text style={styles.scoreNumber}>
              {recordedActivityState.point.toFixed(0)}
            </Text>
          </View>
        </View>

        <View style={styles.activityGrid}>
          <View
            style={{...styles.activityItem, ...styles.activityButtonWrapper}}>
            <View style={styles.button}>
              <Pressable
                onPress={() => {
                  setRemoveDialog(true);
                }}>
                <MaterialCommunityIcons
                  name="delete"
                  size={30}
                  color={brittishPalette.white}
                />
                <Text style={styles.buttonText}>Verwijderen</Text>
              </Pressable>
            </View>
          </View>
          <View
            style={{...styles.activityItem, ...styles.activityButtonWrapper}}>
            <View style={styles.button}>
              <Pressable
                onPress={() => {
                  if (user.a61646d696e) {
                    SetShowSafeAsRouteDialog(true);
                  } else {
                    safeActivity();
                  }
                }}>
                <MaterialCommunityIcons
                  name="content-save"
                  size={30}
                  color={brittishPalette.white}
                />
                <Text style={styles.buttonText}>Opslaan</Text>
              </Pressable>
            </View>
          </View>
        </View>

        <View />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#F5FCFF',
    height: '100%',
  },
  container: {
    height: 250,
    width: '100%',
    backgroundColor: '#F0F0F1FF',
  },
  headerText: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    paddingVertical: 12,
  },
  activityGrid: {
    marginTop: 24,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  activityItem: {
    width: '50%',
  },
  activityHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  activityItemText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  activityButtonWrapper: {
    textAlign: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: colors.main,
    borderRadius: 5,
    padding: 8,
    marginTop: 25,
    width: 150,
  },
  buttonText: {
    paddingTop: 2,
    fontSize: 18,
    color: brittishPalette.white,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  scoreWrapper: {
    marginTop: 32,
  },
  scoreText: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 24,
  },
  scoreNumber: {
    textAlign: 'center',
    fontSize: 36,
  },
});

export default RecordedActivity;

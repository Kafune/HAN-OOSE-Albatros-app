import React, {FunctionComponent, useState} from 'react';
import {ActivityIndicator} from 'react-native';
import Dialog from 'react-native-dialog';
import api from '../core/data/api';
import {Activity} from '../core/domain/Activity';
import {ActivityMapper} from '../core/mapper/ActivityMapper';
import { RouteMapper } from '../core/mapper/RouteMapper';

type Props = {
  navigation: {reset?: any; navigate?: (arg0: string, arg1: any) => void};
  showDialog: boolean;
  close: Function;
  oplsaanAlsActiviteit: Function;
  activity: Activity;
  token: String;
};

export const SafeAsRouteForm: FunctionComponent<Props> = props => {
  // props.close();
  // props.navigation.reset({
  //   index: 0,
  //   routes: [{ name: 'app' }],
  // });

  const [state, setState] = useState(1);
  const [name, setName] = useState<string>('Route naam');
  const [description, setDescription] = useState<string>('Route beschrijving');

  const safe = async () => {
    let prep = ActivityMapper.activityToRoute(props.activity);
    prep.name = name;
    prep.description = description;
    let body = RouteMapper.toDTO(prep);
    console.log(body);
    await fetch(
      api.baseUrl + '/routes?token=' + props.token,
      api.headersPost(body),
    );
  };

  if (state === 1) {
    return (
      <Dialog.Container visible={props.showDialog}>
        <Dialog.Title>Hee admin!</Dialog.Title>
        <Dialog.Description>
          Wil je deze activiteit opslaan als een route?
        </Dialog.Description>
        <Dialog.Button
          label="Route"
          onPress={() => {
            setState(2);
          }}
        />
        <Dialog.Button
          label="Activiteit"
          onPress={() => {
            props.close();
            props.oplsaanAlsActiviteit();
          }}
        />
      </Dialog.Container>
    );
  } else if (state === 2) {
    return (
      <Dialog.Container visible={props.showDialog}>
        <Dialog.Title>Opslaan als Route</Dialog.Title>
        <Dialog.Input
          label="Naam van de route"
          value={name}
          onChangeText={text => setName(text)}
          maxLength={150}
        />
        <Dialog.Input
          label={'Beschrijving van de route ' + description.length + '/ 150'}
          value={description}
          onChangeText={text => setDescription(text)}
          maxLength={150}
          multiline={true}
          numberOfLines={6}
        />
        <Dialog.Button
          label="Annuleren"
          onPress={() => {
            props.close();
          }}
        />
        <Dialog.Button
          label="Opslaan"
          onPress={async () => {
            setState(3);
            await safe();
            props.close();
            props.navigation.reset({
              index: 0,
              routes: [{name: 'app'}],
            });
          }}
        />
      </Dialog.Container>
    );
  }
  return (
    <Dialog.Container visible={props.showDialog}>
      <Dialog.Title> </Dialog.Title>
      <ActivityIndicator size="large" color="#00ff00" />
    </Dialog.Container>
  );
};

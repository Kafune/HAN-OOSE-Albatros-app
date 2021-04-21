import React from 'react';
import {Route} from '../utilities/interface/Route';
import {Text} from 'react-native';

interface Props {
  route: Route;
}
const RouteInformation: React.FC<Props> = (): JSX.Element => {
  return <Text>Test</Text>;
};

export default RouteInformation;

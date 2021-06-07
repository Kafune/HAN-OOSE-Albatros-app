import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import Main from './src/Main';
import {name as appName} from './index.json';
import {LogBox} from 'react-native';

AppRegistry.registerComponent(appName, () => Main);
LogBox.ignoreAllLogs();

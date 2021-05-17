import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {createStackNavigator} from '@react-navigation/stack';
import RoutesPage from './pages/RoutesPage';
import colors from './styles/colors';
import LoginPage from './pages/LoginPage';
import NewRoutesPage from './pages/NewRoutePage';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';

import {store, persistor} from './core/redux/store/Store';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const StackContainer = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="login" component={LoginPage} />
        <Stack.Screen name="app" component={MainContainer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const MainContainer = () => {
  return (
    <Tab.Navigator
      initialRouteName="viewMaps"
      tabBarOptions={{
        activeTintColor: colors.main,
        safeAreaInsets: {bottom: 5},
      }}>
      <Tab.Screen
        name="routesMaps"
        component={RoutesPage}
        options={{
          tabBarLabel: 'Routes',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="map" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="newRoute"
        component={NewRoutesPage}
        options={{
          tabBarLabel: 'Add route',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="map" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const Main: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <StackContainer />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default Main;

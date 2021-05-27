import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {createStackNavigator} from '@react-navigation/stack';
import RoutesPage from './pages/RoutesPage';
import colors from './styles/colors';
import RecordActivity from './pages/RecordActivity';
import LoginPage from './pages/LoginPage';
import NewRoutesPage from './pages/NewRoutePage';
import ProfilePage from './pages/ProfilePage';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider, useSelector} from 'react-redux';

import {store, persistor} from './core/redux/store/Store';
import RecordedActivity from './pages/RecordedActivity';

const Stack = createStackNavigator();
const Activity = createStackNavigator();
const Tab = createBottomTabNavigator();

const StackContainer = () => {
  const userLoggedIn = useSelector(state => state.user.username);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {userLoggedIn ? (
          <Stack.Screen name="app" component={LoginPage} />
        ) : (
          <Stack.Screen name="login" component={MainContainer} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const ActivityContainer = () => {
  return (
    <Activity.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Record" component={RecordActivity} />
      <Stack.Screen name="recordedActivity" component={RecordedActivity} />
    </Activity.Navigator>
  );
};

const MainContainer = () => {
  return (
    <Tab.Navigator
      initialRouteName="routesMaps"
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
        name="Record"
        component={ActivityContainer}
        options={{
          tabBarLabel: 'Opnemen',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="record-circle"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="newRoute"
        component={NewRoutesPage}
        options={{
          tabBarLabel: 'Voeg Route Toe',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="map-marker-plus"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="profile"
        component={ProfilePage}
        options={{
          tabBarLabel: 'Profiel',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="account-circle"
              size={size}
              color={color}
            />
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

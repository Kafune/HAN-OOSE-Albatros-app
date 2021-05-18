import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import RoutesPage from './pages/RoutesPage';
import colors from './styles/colors';
import NewRoutePage from './pages/NewRoutePage';

const Tab = createBottomTabNavigator();

const Main: React.FC = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
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
            component={NewRoutePage}
            options={{
              tabBarLabel: 'Add route',
             tabBarIcon: ({color, size}) => (
               <MaterialCommunityIcons name="map" size={size} color={color} />
             ),
            }} 
           />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default Main;

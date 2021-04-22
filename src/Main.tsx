import React, {FC} from 'react';
import MapsPage from './pages/MapPage';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();

const Main: FC = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
        initialRouteName="viewMaps">

          <Tab.Screen
            name="viewMaps"
            component={MapsPage}
            options={{
              tabBarLabel: 'View Maps',
              tabBarIcon: ({color, size}) => (
                <MaterialCommunityIcons name="map" size={size} color={color} />
              )
            }}
          />

        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default Main;

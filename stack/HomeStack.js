import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Main from './../components/Main';
import About from './../components/About';
import colorTheme from '../colorTheme';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={Main}
          options={{
            title: 'Beats & Pitches',
            headerTintColor: colorTheme.dark,
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: colorTheme.midBright,
            },
          }}
        />
        <Stack.Screen
          name="About"
          component={About}
          options={{
            headerTintColor: colorTheme.bright,
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: colorTheme.dark,
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default HomeStack;

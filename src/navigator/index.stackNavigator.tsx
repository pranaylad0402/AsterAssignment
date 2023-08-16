import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import React from 'react';
const StocksHoldingsScreen = () => null;

const Stack = createNativeStackNavigator();

export const StackNavigator = props => {
  // screenOptions is the options that will be applied to the screens
  const screenOptions: NativeStackNavigationOptions = {
    headerShown: false,
    animation: 'default',
  };
  return (
    <Stack.Navigator
      screenOptions={screenOptions}
      initialRouteName={'StocksHoldingsScreen'}>
      <Stack.Screen
        name={'StocksHoldingsScreen'}
        component={StocksHoldingsScreen}
      />
    </Stack.Navigator>
  );
};

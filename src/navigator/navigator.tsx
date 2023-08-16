import {NavigationContainer} from '@react-navigation/native';
import React, {FC} from 'react';
import {StackNavigator} from './index.stackNavigator';
export const AppNavigator: FC<any> = props => {
  return (
    <NavigationContainer>
      <StackNavigator {...props} />
    </NavigationContainer>
  );
};

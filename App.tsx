import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { Tabs } from './src/navigator/Tabs';
import { StatusBar } from 'react-native';

const App = () => {
  return (
      
      <NavigationContainer>
        <StatusBar barStyle='dark-content' backgroundColor='white'/>
          <Tabs />
      </NavigationContainer>
   
  )
}

export default App;
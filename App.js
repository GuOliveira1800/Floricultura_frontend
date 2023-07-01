import { StatusBar } from 'react-native';
import React from 'react';

import Routes from './src/route';

import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <NavigationContainer>
      <Routes/>
    </NavigationContainer>
  );
}


import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { HomeScreen } from '../screens/HomeScreen';
import { PokemonScreen } from '../screens/PokemonScreen';
import { SinglePokemon } from '../interfaces/pokemonInterfaces';

export type RootStackParams = {
  HomeScreen: undefined;
  PokemonScreen: {
    singlePokemon: SinglePokemon,
    color: string
  }
}

const Stack = createStackNavigator<RootStackParams>();

export const Tab1 = () => {
  return (
    <Stack.Navigator
        screenOptions={{
            headerShown: false,
            cardStyle: {
                backgroundColor: '#fff'
            }
        }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="PokemonScreen" component={PokemonScreen} />
     
    </Stack.Navigator>
  );
}
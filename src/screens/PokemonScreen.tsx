import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { FadeInImage } from '../components/FadeInImage';
import { RootStackParams } from '../navigator/Tab1';
import { usePokemon } from '../hooks/usePokemon';
import { PokemonDetails } from '../components/PokemonDetails';


interface Props extends StackScreenProps<RootStackParams, 'PokemonScreen'>{};

export const PokemonScreen = ({navigation, route}: Props) => {
    
    const {singlePokemon, color} = route.params;
    const {top} = useSafeAreaInsets();
    const {id, name, image} = singlePokemon;

    const {pokemon, isLoading} = usePokemon(id);
        

    return (
        <View style={{flex: 1}}>
            
            {/* Header */}
            <View style={{
                ...styles.headerContainer,
                backgroundColor: color,
            }}>
                {/* Back Button */}
                <TouchableOpacity
                    onPress={() => navigation.pop()}
                    style={{
                        ...styles.backButton,
                        top: top + 20 
                    }}
                >
                    <Icon 
                        name='arrow-back-outline'
                        color='white'
                        size={30}
                    />
                </TouchableOpacity>
                
                {/* Pokemon info */}
                <Text 
                    style={{
                        ...styles.pokemonName,
                        top: top + 50
                    }}
                >
                    {name + '\n'} #{id}
                </Text>

                <Image 
                    source={require('../assets/pokebola-blanca.png')}
                    style={{
                        ...styles.pokeball
                    }}
                />

                <FadeInImage 
                    uri={image}
                    style={{
                        ...styles.pokemonImage
                    }}
                />

            </View>

                {/* Details and Loading */}
                {
                    isLoading && 
                    (
                        <View
                            style={{
                                ...styles.loading
                            }}
                        >
                            <ActivityIndicator 
                                color={color}
                                size={50}
                            />
                        </View>

                    )
                }

                <PokemonDetails pokemon={pokemon} />
        </View>
    )
}

const styles = StyleSheet.create({

    headerContainer: {
        height: 350,
        zIndex: 999,
        alignItems: 'center',
        borderBottomRightRadius: 1000,
        borderBottomLeftRadius: 1000,
    },
    backButton:{
        position: 'absolute',
        left: 20
    },
    pokemonName: {
        fontSize: 25,
        color: 'white',
        position: 'absolute',
        left: 25
    },
    pokeball: {
        width: 250,
        height: 250,
        bottom: -100,
        opacity: 0.7
    },
    pokemonImage:{
        height: 250,
        width: 250,
        position: 'absolute',
        bottom: -20
        
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
    }
    
});

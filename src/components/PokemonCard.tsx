
import React, { useEffect, useRef } from 'react'
import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import ImageColors from 'react-native-image-colors';

import { FadeInImage } from './FadeInImage';
import { SinglePokemon } from '../interfaces/pokemonInterfaces';


const windowWidth = Dimensions.get('window').width;

interface Props{

    pokemon: SinglePokemon

}

export const PokemonCard = ({pokemon}: Props) => {

    const [bgColor, setBgColor] = useState('grey');
    const isMounted = useRef(true);
    const navigation = useNavigation<any>();

    const getColors = () => {
        

        const uri = pokemon.image;
    
        const result = ImageColors.getColors(uri, {fallback: 'grey'})
        .then( colors =>{

            if (!isMounted.current) return;
            
            (colors.platform === 'android') && setBgColor(colors.dominant || 'grey');

            (colors.platform === 'ios') && setBgColor(colors.background || 'grey')
          
        } )
        .catch(err =>{
            setBgColor('grey')
        })
        
    }

    useEffect(() => {
        getColors();

        return () =>{
            isMounted.current = false;
        }


    }, [])


    return (
       <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('PokemonScreen', {singlePokemon: pokemon, color: bgColor})}
       >
           <View style={{
               ...styles.cardContainer,
               width: windowWidth * 0.4,
               backgroundColor: bgColor
            }}>
                {/*Pokemon name and id */}
             <View>
                 <Text style={styles.name}>
                     {pokemon.name}
                     { '\n#' + pokemon.id}
                 </Text>
             </View>
            
            <View style={styles.pokebolaContainer}>
                <Image 
                   source={require('../assets/pokebola-blanca.png')}
                   style={styles.pokebola}
                />
            </View>
             <FadeInImage 
                uri={pokemon.image}
                style={styles.pokemonImage}
             />
            
           </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    
    cardContainer: {
        marginHorizontal: 18,
        backgroundColor: 'red',
        width: 110,
        height: 100,
        marginBottom: 20,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        
        elevation: 6,
        
    },
    name: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        top: 20,
        left: 10
    },
    pokebolaContainer: {
        height: 90,
        width: 90,
        position: 'absolute',
        right: 0,
        bottom: 0,
        overflow: 'hidden',
    },
    pokebola: {
        width: 100,
        height: 100,
        position: 'absolute',
        bottom: -30,
        right: -30,
        opacity: 0.8
    },
    pokemonImage: {
        height: 90,
        width: 90,
        position: 'absolute',
        right: -8,
        bottom: -5
    }

});

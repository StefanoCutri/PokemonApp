import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import {ScrollView } from 'react-native-gesture-handler';

import { CompletedPokemon } from '../interfaces/pokemonInterfaces';
import { FadeInImage } from './FadeInImage';

interface Props{
    pokemon: CompletedPokemon
}


export const PokemonDetails = ({pokemon}: Props) => {

    return (
        <ScrollView
        showsVerticalScrollIndicator={false}
            style={{
                ...StyleSheet.absoluteFillObject,
            }}
        >
            {/* Types and weight */}
            <View style={{
                ...styles.container,
                marginTop: 380
            }}>

                {
                    pokemon.types &&
                    <>
                        <Text style={styles.title}>Types</Text>
                        <View style={{flexDirection: 'row'}}>
                                {

                                    pokemon.types.map(({type}) =>
                                    {
                                        return (
                                            <Text
                                            key={type.name}
                                            style={{
                                                ...styles.defaultText, 
                                                marginRight: 10}}
                                        >
                                            {type.name}
                                        </Text>
                                        )
                                    }
                                    )

                                }
                        </View>
                    </>
                        
                }
                {/* Weight */}
                <Text style={styles.title}>Weight</Text>
                <Text style={styles.defaultText}>{pokemon.weight / 10}kg</Text>
            </View>

            {/* Sprites */}
            <View style={styles.container}>
                <Text style={styles.title}>Sprites</Text>
            </View>

            <ScrollView
                horizontal
            >
                <FadeInImage 
                    style={styles.sprite} 
                    uri={ pokemon.sprites && pokemon.sprites.front_default} 
                />
                <FadeInImage 
                    style={styles.sprite} 
                    uri={ pokemon.sprites && pokemon.sprites.back_default} 
                />
                <FadeInImage
                    style={styles.sprite} 
                    uri={ pokemon.sprites && pokemon.sprites.front_shiny} 
                 />                
                 <FadeInImage 
                    style={styles.sprite}
                    uri={ pokemon.sprites && pokemon.sprites.back_shiny} 
                 />
               
            </ScrollView>

             {/* Skills */}
             <View style={styles.container}>
                <Text style={styles.title}>Basic skills</Text>
                <View style={{flexDirection: 'row'}}>
                        {
                          pokemon.abilities &&  pokemon.abilities.map(({ability}) =>
                            {
                                return (
                                    <Text
                                        key={ability.name}
                                        style={{
                                            ...styles.defaultText, 
                                            marginRight: 10}}
                                    >
                                        {ability.name}
                                    </Text>

                                )
                            }
                            )
                        }
                    </View>
            </View>  

             {/* Movies */}
             <View style={styles.container}>
                <Text style={styles.title}>Movements</Text>
                <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                        {
                          pokemon.moves &&  pokemon.moves.map(({move}) =>
                            {
                                return (
                                    <Text
                                        key={move.name}
                                        style={{
                                            ...styles.defaultText, 
                                            marginRight: 10}}
                                    >
                                        {move.name}
                                    </Text>

                                )
                            }
                            )
                        }
                    </View>
            </View>  

             {/* Stats */}
             <View style={styles.container}>
                <Text style={styles.title}>Stats</Text>
                <View>
                        {
                          pokemon.stats &&  pokemon.stats.map((stat, i) =>
                            {
                                return (
                                 <View key={stat.stat.name + i}
                                       style={{
                                            flexDirection: 'row'
                                       }}
                                 >
                                        <Text style={{
                                            ...styles.defaultText, 
                                            marginRight: 10,
                                            width: 150
                                        }}
                                         >
                                        {stat.stat.name}
                                         </Text>
                                        <Text style={{
                                            ...styles.defaultText, 
                                            fontWeight: 'bold'
                                           }}
                                         >
                                        {stat.base_stat}
                                         </Text>
                                 </View>

                                )
                            }
                            )
                        }
                    </View>
            </View>  

            {/* Final sprite */}
            <View style={{
                marginBottom: 50,
                alignItems: 'center'
            }}>
                  <FadeInImage 
                    style={styles.sprite} 
                    uri={ pokemon.sprites && pokemon.sprites.front_default} 
                />
            </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({

    container: {
        marginHorizontal: 20
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 20
    },
    defaultText:{
        fontSize: 19
    },
    sprite: {
        width: 90,
        height: 90,
    }
    
});

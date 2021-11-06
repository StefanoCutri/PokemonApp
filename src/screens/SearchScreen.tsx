import React, { useState } from 'react'
import { useEffect } from 'react';
import { Text, View, Platform, FlatList, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Loading } from '../components/Loading';
import { PokemonCard } from '../components/PokemonCard';
import { SearchInput } from '../components/SearchInput';

import { usePokemonSearch } from '../hooks/usePokemonSearch';
import { globalStyles } from '../theme/gobalTheme';
import { SinglePokemon } from '../interfaces/pokemonInterfaces';

const screenWidht = Dimensions.get('window').width;

export const SearchScreen = () => {

    const {top} = useSafeAreaInsets();
    const {isFetching, singlePokemons} = usePokemonSearch();
    const [filteredPokemons, setFilteredPokemons] = useState<SinglePokemon[]>([]);
    const [term, setTerm] = useState('');

    useEffect(() => {

        if (term.length === 0) {
            setFilteredPokemons([]);
        }

        if (isNaN(Number(term))) {

            setFilteredPokemons(
                singlePokemons.filter( pokemon => {

                    return pokemon.name.toLowerCase().includes(term.toLowerCase())
                    
                })
            );
            
        }else{
            const pokemonById = singlePokemons.find( pokemon => pokemon.id === term)!;
            setFilteredPokemons(
                (pokemonById) ? [pokemonById] : []
            )

        }

    }, [term])



    if (isFetching) {
        return (
            <Loading />
        )
    }

    return (
        <View style={{
            flex: 1,
        }}>
            
            <SearchInput 
                onDebaunce={(value) => setTerm(value)}
                style={{
                    position: 'absolute',
                    zIndex: 999,
                    width: screenWidht - 40,
                    top: (Platform.OS === 'ios' ? 0 : top + 10),
                }}

            />

            <FlatList
                data={filteredPokemons}
                keyExtractor={(pokemon) => pokemon.id}
                renderItem={({item})=>(<PokemonCard pokemon={item}/>)}
                numColumns={2}
                
                // Header
                ListHeaderComponent={(
                    <Text style={{
                        ...globalStyles.title,
                        ...globalStyles.globalMargin,
                        marginTop: (Platform.OS === 'ios' ? top + 60 : top + 75),
                    }}>
                        {term}
                    </Text>
                )}

            />

        </View>
    )
}


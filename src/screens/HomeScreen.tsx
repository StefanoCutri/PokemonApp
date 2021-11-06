import React from 'react'
import { ActivityIndicator, FlatList, Image, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { globalStyles } from '../theme/gobalTheme';
import { usePokemonPagination } from '../hooks/usePokemonPagination';
import { PokemonCard } from '../components/PokemonCard';

export const HomeScreen = () => {

    const {singlePokemons, loadPokemons} = usePokemonPagination();

    return (
        <>
            <Image
                style={{...globalStyles.pokebolaBG}}
                source={require('../assets/pokebola.png')}
            />
            <FlatList
                data={singlePokemons}
                keyExtractor={(pokemon) => pokemon.id}
                renderItem={({item})=>(<PokemonCard pokemon={item}/>)}

                onEndReached={loadPokemons}
                onEndReachedThreshold={0.4}

                numColumns={2}
                
                // Header
                ListHeaderComponent={(
                    <Text style={{
                     ...globalStyles.title,
                     ...globalStyles.globalMargin
                    }}>
                        Pokedex
                    </Text>
                )}

                // Footer
                ListFooterComponent={(
                    <ActivityIndicator style={{height: 100}} size={25} color='gray'/>
                )}
            />
            
        </>
    )
}

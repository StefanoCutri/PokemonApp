import { useEffect, useState } from 'react';

import { pokemonApi } from '../apis/pokemonApi';
import { PokemonResponse, SinglePokemon, Result } from '../interfaces/pokemonInterfaces';


export const usePokemonSearch = () => {

    const [isFetching, setIsFetching] = useState(true)
    const [singlePokemons, setSinglePokemons] = useState<SinglePokemon[]>([]);

    const loadPokemons = async() => {

        const resp = await pokemonApi.get<PokemonResponse>('https://pokeapi.co/api/v2/pokemon?limit=1200');

        mapPokemonList(resp.data.results);
    }


    const mapPokemonList = (pokemonList: Result[]) => {

      const newPokemonList : SinglePokemon[] = pokemonList.map( ({name, url}) =>{

        const urlParts = url.split('/');
        const id = urlParts[urlParts.length - 2];
        const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

        return {id, name, image}
      })
        setSinglePokemons(newPokemonList)
        setIsFetching(false);
    }
    

    useEffect(() => {
        loadPokemons();
    }, [])
    
    return{
        isFetching,
        singlePokemons
    }

}

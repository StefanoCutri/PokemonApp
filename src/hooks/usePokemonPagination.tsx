import { useEffect, useRef, useState } from 'react';
import { pokemonApi } from '../apis/pokemonApi';
import { PokemonResponse, SinglePokemon, Result } from '../interfaces/pokemonInterfaces';


export const usePokemonPagination = () => {

    const [isLoading, setIsLoading] = useState(true)
    const [singlePokemons, setSinglePokemons] = useState<SinglePokemon[]>([]);
    const nextPokemonPage = useRef('https://pokeapi.co/api/v2/pokemon?limit=40');

    const loadPokemons = async() => {
        setIsLoading(true);

        const resp = await pokemonApi.get<PokemonResponse>(nextPokemonPage.current);
        nextPokemonPage.current = resp.data.next;
        
        mapPokemonList(resp.data.results);
    }


    const mapPokemonList = (pokemonList: Result[]) => {

      const newPokemonList : SinglePokemon[] = pokemonList.map(({name, url})=>{

        const urlParts = url.split('/');
        const id = urlParts[urlParts.length - 2];
        const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`

        return {id, name, image}
      })
        setSinglePokemons([...singlePokemons, ...newPokemonList])
        setIsLoading(false);
    }
    

    useEffect(() => {

        loadPokemons();

    }, [])
    
    return{
        isLoading,
        singlePokemons,
        loadPokemons
    }

}

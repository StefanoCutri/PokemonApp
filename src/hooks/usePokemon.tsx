import { useEffect, useState } from "react"
import { CompletedPokemon } from '../interfaces/pokemonInterfaces';
import { pokemonApi } from '../apis/pokemonApi';

export const usePokemon = (id: string) => {
  
    const [isLoading, setIsLoading] = useState(true);
    const [pokemon, setPokemon] = useState<CompletedPokemon>({} as CompletedPokemon);
    const [types, setTypes] = useState();
    const [abilities, setAbilities] = useState();
    const [sprites, setSprites] = useState();

    const loadPokemon = async () => {

        const resp = await pokemonApi.get<CompletedPokemon>(`https://pokeapi.co/api/v2/pokemon/${id}`);
            setPokemon(resp.data);
    
            if (resp.data !== undefined) {
                setTypes(resp.data.types as any)
                setAbilities(resp.data.abilities as any)
                setSprites(resp.data.sprites as any)
            }
        setIsLoading(false);
    };

    useEffect(() => {
        loadPokemon();
    }, [])

    return{
        isLoading, 
        pokemon,
        abilities,
        sprites,
        types
    }

}

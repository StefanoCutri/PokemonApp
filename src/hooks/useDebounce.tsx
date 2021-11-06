import { useEffect, useState } from "react";

export const useDebounce = (input: string = '', time: number = 500) => {

    const [debouncedInput, setDebouncedInput] = useState('');

    useEffect(() => {

        const timeout = setTimeout( () => {
            setDebouncedInput(input);
        }, time);

        return () => {
            clearTimeout(timeout);
        }
        
    }, [input])

    return debouncedInput
    

}

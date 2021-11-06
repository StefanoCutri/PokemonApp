import React, { useEffect, useState } from 'react'
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

import { useDebounce } from '../hooks/useDebounce';


interface Props{
    onDebaunce: (value: string) => void;
    style?: StyleProp<ViewStyle>;
}

export const SearchInput = ({style, onDebaunce}: Props) => {

    const [inputValue, setInputValue] = useState('');
    const debounceValue = useDebounce(inputValue, 500);


    useEffect(() => {
        onDebaunce(debounceValue);

    }, [debounceValue])


    return (
        <View style={{
            ...styles.container,
            ...style as any
            }}>
            <View style={styles.textBackgorund}> 
                <TextInput 
                    placeholder='search pokemon'
                    placeholderTextColor='grey' 
                    style={styles.textInput}
                    autoCapitalize='none'
                    autoCorrect={false}
                    value={inputValue}
                    onChangeText={setInputValue}
                 />
                <Icon name='search-outline' color='grey' size={25}/>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({

    container: {
        marginHorizontal: 20
    },
    textBackgorund: {
        backgroundColor:'#F3F1F3',
        borderRadius: 50,
        color: 'grey',
        height: 50,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        
        elevation: 7,
    },
    textInput:{
        flex: 1,
        fontSize: 18,
        color: '#000'
     }
    
});

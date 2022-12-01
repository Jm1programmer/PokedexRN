

import React, {useEffect, useState } from "react";
import { FlatList, Text, StyleSheet, Dimensions, ActivityIndicator} from "react-native";

import PokemonCart from "./pokemonCart";
import LoadingPokeball from "./loadingPokeball";
import CompletePokedex from "./CompletePokedex";

import { COLORS } from "../colors";

import api from "../../services/api";

export default function PostsFlatList({ Topo}) {
    const per_page = 10;
    const [page, setPage] = useState(10)
    const [loading, setLoading] = useState(false)
    const [hasmoredata, setHasmoredata] = useState(true)

async function GetContent() {

  
  const baseUrl = 'https://pokeapi.co/api/v2';
    try {
        const resultado =  await api.get(`${baseUrl}/pokemon?limit=${page}`)
        return resultado.data

    }
    
    catch (error) {
        console.log(error)
        return {}
    }
}

   
    const [lista, setLista] = useState([]);
        
    const getContent = async () => {
        const resultado = await GetContent()
   
        setLista(resultado.results)
        
        if (page <=(912)) {
        setPage(page + per_page)
      
        } else {
            setHasmoredata(false)
        }
        setLoading(false)
       
     }
    
   
    
     useEffect(() => {
        if (loading) return;

        setLoading(true)

      getContent()
     }, [])


    
     
 
    

     if (lista == undefined) { 
            return <>
            <Text>Loading...</Text>
            </>
     } else {
        return <>
                <FlatList style={styles.FlatList}
                data={lista}
                renderItem={({ item }) =>  <PokemonCart  {...item}  />  }
                keyExtractor={({name}) => name}
                horizontal={false}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={() => {
                    if (hasmoredata) {
                    return <LoadingPokeball />
                    } else {
                       return <CompletePokedex />
                    }
                }}
                ListHeaderComponent={Topo}
                numColumns={2}
                onEndReached={getContent}
                onEndReachedThreshold={0.1}
                 />
        
                 
            </>
        
            
            
        }
        
        }


const styles = StyleSheet.create({
    FlatList: {
        flexBasis: 0,
    },
    Title: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 18,
        color: COLORS.Black,
        zIndex: 99,
    },
})
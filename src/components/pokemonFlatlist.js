

import React, {useEffect, useState } from "react";
import { FlatList, Text, StyleSheet, Dimensions, ActivityIndicator} from "react-native";
import PokemonCart from "./pokemonCart";
import { COLORS } from "../colors";

import api from "../../services/api";

export default function PostsFlatList() {
    const per_page = 5;
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    

async function GetContent() {

  
  const baseUrl = 'https://pokeapi.co/api/v2';
    try {
        const resultado =  await api.get(`${baseUrl}/pokemon?limit=10`)
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
    
        
        setPage(page + 1)
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
                ListFooterComponent={<ActivityIndicator size={'large'} color={COLORS.White} />}
                numColumns={2}
                
                 />
        
                 
            </>
        
            
            
        }
        
        }


const styles = StyleSheet.create({
    FlatList: {
        flexBasis: 0,
    }
})
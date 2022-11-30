import React, {useEffect,useState} from "react";
import { Text, StyleSheet, View, Dimensions, Image, TouchableOpacity } from "react-native";
import { COLORS } from "../colors";

import api from "../../services/api";


export default function PokemonCart({name, url}) {
  const [type, setType] = useState('')
  async function GetContent() {
    const baseUrl = 'https://pokeapi.co/api/v2/';
      try {
          const resultado =  await api.get(`${baseUrl}pokemon/${name}`)
          
          return resultado.data
          
      }
      
      catch (error) {
          console.log(error)
          return {}
      }
  };

  const getContent = async () => {
    const resultado = await GetContent()

    setType(resultado.types[0].type.name)
   
 }



  const [image_url, setImage_url] = useState(undefined)
  const pokeNumber = url.replace('https://pokeapi.co/api/v2/pokemon/','').replace('/', '')
  

  useEffect(() => {
    setImage_url(`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/versions/generation-v/black-white/animated/${pokeNumber}.gif`)
   getContent()
  }, [])
  
  return <>
    
    <TouchableOpacity style={[styles.PokeCart, {backgroundColor: COLORS[type],}]}>
        <Text style={styles.PokemonNumber}>{`0${pokeNumber}`.slice(-3)}</Text>
        <Text style={styles.PokemonName}>{name}</Text>
        <View style={styles.ViewPokemonImage}>
            <Image source={{uri: image_url}} style={styles.pokemonImage} resizeMode={'contain'} />
        </View>
    </TouchableOpacity>
  

 
  </>
}

const height= Dimensions.get('window').height
const styles = StyleSheet.create({
    PokeCart: {
        width: '45%',
        height: height / 5,
        marginHorizontal: 10,
        marginTop: 10,
        borderRadius: 10,
        
        paddingHorizontal: 10,
      paddingVertical: 10,
        justifyContent: 'space-between',
    },
    PokemonName: {
      fontFamily: 'Montserrat-SemiBold',
      fontSize: 18,
      color: COLORS.White,
      zIndex: 99,
    },

    PokemonNumber: {
      fontFamily: 'Montserrat-Bold',
      fontSize: 50,
      color: COLORS.White
    },

    ViewPokemonImage: {
      position: 'absolute',
      alignSelf: 'flex-end',
      right: 0,
      top: '20%',
    },
    pokemonImage: {
      width: 90,
      height: 90,
    
      
    }
})
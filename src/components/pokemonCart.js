import React, {useEffect,useState} from "react";
import { Text, StyleSheet, View, Dimensions, Image, TouchableOpacity } from "react-native";
import { COLORS } from "../colors";

import api from "../../services/api";
import { useNavigation } from "@react-navigation/native";


export default function PokemonCart({name, url}) {
  console.log(url)
  const navigation = useNavigation()
  const pokeNumber = url.replace('https://pokeapi.co/api/v2/pokemon/','').replace('/', '')
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

  

  useEffect(() => {

    if (pokeNumber <= 999) {
      setImage_url(`http://www.serebii.net/pokemongo/pokemon/${`00${pokeNumber}`.slice(-3)}.png`)
     
    } else {
      setImage_url(`http://www.serebii.net/pokemongo/pokemon/${`{pokeNumber}`}.png`)
    }
    
    //http://www.serebii.net/pokemongo/pokemon/${`0${pokeNumber}`.slice(-3)}.png
   getContent()
  }, [])
  

  function PokeNumber() {
    if (pokeNumber >= 999) {
      return <>
       <Text style={styles.PokemonNumber}>{`${pokeNumber}`}</Text>
      </>
     
    } else {
     return <>
      <Text style={styles.PokemonNumber}>{`00${pokeNumber}`.slice(-3)}</Text>
     </>
    }
  }

  return <>
    
    <TouchableOpacity onPress={() => {
        navigation.navigate('Pokemon', {name: name, image: image_url, pokeNumber: pokeNumber, type: type,})
    }} style={[styles.PokeCart, {backgroundColor: COLORS[type],}]}>
       <PokeNumber />
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
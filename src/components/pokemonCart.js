import React, {useEffect,useState, memo} from "react";
import { Text, StyleSheet, View, Dimensions, Image, TouchableOpacity,  } from "react-native";
import { COLORS } from "../colors";

import api from "../../services/api";
import { useNavigation } from "@react-navigation/native";
import LoadingPokeball from "./loadingPokeball";

function PokemonCart({name, url}) {
  
  const navigation = useNavigation()
  const pokeNumber = url.replace('https://pokeapi.co/api/v2/pokemon/','').replace('/', '')
  

  const name_ = name.charAt(0).toUpperCase() + name.slice(1)

  if (pokeNumber > 905) return;

  const [type, setType] = useState('')
  const [type2, setType2] = useState('')
  const [res, setRes] = useState(undefined)
  const type1_ = type.charAt(0).toUpperCase() + type.slice(1)
  const type2_ = type2.charAt(0).toUpperCase() + type2.slice(1)



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
    if (resultado.types[1] ) {
    setType2(resultado.types[1].type.name)

    
    }


    setRes(resultado)
    
 }



  const [image_url, setImage_url] = useState(undefined)

  

  useEffect(() => {

    if (pokeNumber <= 999) {
      setImage_url(`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${`00${pokeNumber}`.slice(-3)}.png`)
      //https://assets.pokemon.com/assets/cms2/img/pokedex/full/${`00${pokeNumber}`}.slice(-3)}.png
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

  function PokeTypes() {

    if (res != undefined) {

    if (res.types[1] ) {
      return <>
      <View style={styles.PokemonTypes}>
        <View style={[styles.type, {backgroundColor: COLORS[type + 'Attack']}]}>
            <Text style={styles.typeText}>{type1_}</Text>
        </View>
  
        <View style={[styles.type, {backgroundColor: COLORS[type2 + 'Attack']}]}>
            <Text style={styles.typeText}>{type2_}</Text>
        </View>
      </View>
      </>
      
      } else {
        return <>
         <View style={styles.PokemonTypes}>
        <View style={[styles.type, {backgroundColor: COLORS[type + 'Attack']}]}>
            <Text style={styles.typeText}>{type1_}</Text>
        </View>
        </View> 
        </>
      }
    }
   

    
  }

 
    if (type != '') {
  return <>
    
    <TouchableOpacity onPress={() => {
        navigation.navigate('Pokemon', {name: name_, image: image_url, pokeNumber: pokeNumber, type1: type, type2: type2, })
    }} style={[styles.PokeCart, {backgroundColor: COLORS[type],}]}>
       <PokeNumber />
       <PokeTypes />
        <Text style={styles.PokemonName}>{name_}</Text>
        <View style={styles.ViewPokemonImage}>
            <Image source={{uri: image_url}} style={styles.pokemonImage} resizeMode={'contain'} />
        </View>
    </TouchableOpacity>
  

 
  </>
} else {
  return <View style={styles.PokeCart}>
    <LoadingPokeball />
  </View>

}

}

export default memo(PokemonCart)

const height= Dimensions.get('window').height
const styles = StyleSheet.create({
    PokeCart: {
        width: '45%',
        height: height / 5,
        marginHorizontal: 10,
        marginTop: 10,
        borderRadius: 10,
        
        paddingHorizontal: 10,
      
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
    
      
    },

    PokemonTypes: {
     alignItems: 'flex-start'
      
    },
    type: {
      minWidth: 60,
      height: 25,
      borderRadius: 16,
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 2,
    },

    typeText: {
      fontFamily: 'Montserrat-Regular',
      fontSize: 13,
      color: COLORS.White
    },
})
import { useNavigation, useRoute } from "@react-navigation/native";
import React, {useEffect,useState} from "react";
import { Text, StyleSheet, View, ScrollView, Dimensions, Image, TouchableOpacity } from "react-native";
import { COLORS } from "../../colors";
import Icon from 'react-native-vector-icons/dist/FontAwesome';



export default function Header() {
    const route = useRoute()

    const [image_url, setImage_url] = useState(undefined)


   const type1 = route.params.type1;
   const type1_ = type1.charAt(0).toUpperCase() + type1.slice(1)
   const type2 = route.params.type2;
   const type2_ = type2.charAt(0).toUpperCase() + type2.slice(1)
   const name = route.params.name;
   
   const pokeNumber = route.params.pokeNumber

    const [heart, setHeart] = useState(false)
    const navigation = useNavigation()

  useEffect(() => {
    setImage_url(route.params.image)

  }, [])

  return <>
    
    

    <View style={[styles.Header, {backgroundColor: COLORS[type1]}]}>

    <View style={styles.TopMenu}>
    <TouchableOpacity style={styles.MenuButton} onPress={() => {
        navigation.goBack()
    }}>
    <Icon name="angle-left" size={40} color={COLORS.White} />
</TouchableOpacity>

<TouchableOpacity style={styles.MenuButton} onPress={ () => {
  setHeart(!heart)
}}>
    <Icon name="heart" size={30} color={heart ? COLORS.red : COLORS.White} />
</TouchableOpacity>

    </View>

    
    <View style={styles.PokeMoreInfo}>
      <Text style={styles.PokemonName}>{name}</Text>
      <Text style={styles.PokemonNumber}>#{`00${pokeNumber}`.slice(-3)}</Text>
    </View>

    <View style={styles.PokemonTypes}>
      <View style={[styles.type, {backgroundColor: COLORS[type1 + 'Attack']}]}>
          <Text style={styles.typeText}>{type1_}</Text>
      </View>

      <View style={[styles.type, {backgroundColor: COLORS[type2 + 'Attack']}]}>
          <Text style={styles.typeText}>{type2_}</Text>
      </View>
    </View>
    <View style={styles.PokemonInfoTop}>

    </View>
  <View style={[styles.PokemonImageView, {backgroundColor: COLORS[type1 + 'Attack']}]}>
  <Image source={{uri: image_url}} style={[styles.pokemonImage,]} resizeMode={'contain'} />
  </View>
    </View>
  

 
  </>
}
const height = Dimensions.get('window').height
const styles = StyleSheet.create({

  TopMenu: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
    Header: {
        height: height/ 2.5,
        backgroundColor: COLORS.White,
        zIndex: 30,
    },

    PokemonInfoTop: {
      width: '100%',
      height: 20,
      backgroundColor: COLORS.White,
      position: 'absolute',
      bottom: 0,
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
      
    },

    PokemonImageView: {
      position: 'absolute',
      bottom: -20,
      alignSelf: 'center',
      width: 150,
      height: 150,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 100,
      zIndex: 110,
    },
    pokemonImage: {
      width: 200,
      height: 200,
      zIndex: 110,
      
      borderRadius: 110,
    },

    PokeMoreInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
    },

    PokemonName: {
      fontFamily: 'Montserrat-Bold',
      fontSize: 35,
      color: COLORS.White
    },

    PokemonNumber: {
      fontFamily: 'Montserrat-Bold',
      fontSize: 18,
      color: COLORS.White
    },

    PokemonTypes: {
      marginVertical: 10,
      marginHorizontal: 20,
      flexDirection: 'row',
    },
    type: {
      minWidth: 90,
      height: 30,
      borderRadius: 16,
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 2,
    },

    typeText: {
      fontFamily: 'Montserrat-Regular',
      fontSize: 15,
      color: COLORS.White
    },
})
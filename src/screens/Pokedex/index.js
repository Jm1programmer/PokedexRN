import React, {useEffect,useState} from "react";
import { Text, StyleSheet, View, Image } from "react-native";
import { COLORS } from "../../colors";


import PokemonFlatList from "../../components/pokemonFlatlist";
import Header from "./header";
import pokeballBackground from '../../../assets/pokeballBackground.png'


export default function Pokedex() {

 const Topo = () => {
    return <>
    <Header />
    </>
 }

  return <>
    
    <View style={styles.screen}>
        <Image style={styles.Pokeball} source={pokeballBackground} resizeMode={'contain'} />
        <PokemonFlatList Topo={Topo} r />
    </View>
  

 
  </>
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: COLORS.White
    },
    Pokeball: {
        position: 'absolute',
        width: 280,
        height: 280,
        right: -120,
        top: -100,
    },
})
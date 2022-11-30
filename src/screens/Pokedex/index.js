import React, {useEffect,useState} from "react";
import { Text, StyleSheet, View, ScrollView } from "react-native";
import { COLORS } from "../../colors";

import PokemonCart from "../../components/pokemonCart";
import PokemonFlatList from "../../components/pokemonFlatlist";

export default function Pokedex() {

 

  return <>
    
    <View style={styles.screen}>
        <PokemonFlatList />
    </View>
  

 
  </>
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: COLORS.White
    },
})
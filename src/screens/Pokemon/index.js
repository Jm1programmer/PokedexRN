import React, {useEffect,useState} from "react";
import { Text, StyleSheet, View, ScrollView } from "react-native";
import { COLORS } from "../../colors";
import Header from "./header";
import PokemonInfo from "./PokemonInfo";


export default function Pokemon() {


  return <>
    
    <View style={styles.screen}>
        
    <ScrollView>
        <Header style={styles.Header}/>
       
        <PokemonInfo />
        </ScrollView>

    </View>
  

 
  </>
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: COLORS.White,
        
    },
   
})
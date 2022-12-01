import React, {useEffect,useState} from "react";
import { Text, StyleSheet, View, Image } from "react-native";
import { COLORS } from "../colors";

import Professor_Oak from '../../assets/Professor_Oak.png'
import textBox from '../../assets/textBox.png'

export default function CompletePokedex() {


  return <>
    
    <View style={styles.CompletePokedex}>
        <Image style={styles.Professor} source={Professor_Oak} resizeMode={'contain'} />
        <View style={styles.TextBox}>
            <Image style={styles.ImageTextBox} source={textBox} resizeMode={'contain'} />
            <Text style={styles.TextTextBox}>Your pokedex is entirely complete Congratulations!</Text>
        </View>
    </View>
  

 
  </>
}

const styles = StyleSheet.create({
  CompletePokedex: {
    alignItems: 'center',
   marginVertical: 30,
  },
     Professor: {
        width: 250,
        height: 250,
    },

    TextBox: {
        marginVertical: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },

    ImageTextBox: {
        width: 580,
        height: 100,
       
    },
    TextTextBox: {
        position: 'absolute',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 18,
        color: COLORS.Black,
        textAlign: 'center',
        width: 250,
    }
})
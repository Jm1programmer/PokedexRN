import React, {useEffect,useState} from "react";
import { Text, StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
import { COLORS } from "../../colors";

import Icon from 'react-native-vector-icons/dist/AntDesign';


export default function Header() {

 

  return <>
    
    <View style={styles.Header}>
        <Menu />
       <Text style={styles.Title}>Pokedex</Text>
    </View>
  

 
  </>
}

function Menu() {
return <>
<TouchableOpacity style={styles.MenuButton}>
    <Icon name="bars" size={30} color={COLORS.Black} />
</TouchableOpacity>

</>
}

const styles = StyleSheet.create({
    Header: {
        marginHorizontal: 10,
        marginVertical: 30,
    },

    Title: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 28,
        color: COLORS.Black,
     
      },
      MenuButton: {
        alignItems: 'flex-end'
      }
})
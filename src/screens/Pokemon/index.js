import React, {useEffect,useState} from "react";
import { Text, StyleSheet, View, ScrollView } from "react-native";
import { COLORS } from "../../colors";
import Header from "./header";



export default function Pokemon() {


  return <>
    
    <View style={styles.screen}>
        <Header />
    </View>
  

 
  </>
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: COLORS.White,
    },
})
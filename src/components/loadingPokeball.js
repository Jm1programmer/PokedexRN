import React, {useEffect,useState} from "react";
import { Text, StyleSheet, View, ScrollView, Image, Animated, Easing } from "react-native";
import { COLORS } from "../../colors";
import loading from '../../assets/loading.png'


export default function LoadingPokeball() {

    let rotateValueHolder = new Animated.Value(0);

    const startImageRotateFunction = () => {
        rotateValueHolder.setValue(0);
        Animated.timing(rotateValueHolder, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: false,
        }).start(() => startImageRotateFunction());
      };

      const rotateData = rotateValueHolder.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
      });

      startImageRotateFunction()

  return <>
    <Animated.Image style={[styles.Pokeball, { transform: [{rotate: rotateData}],}]} source={loading} />
  

 
  </>
}

const styles = StyleSheet.create({
   Pokeball: {
        width: 30,
        height: 30,
        alignSelf: 'center',
       
   }
})
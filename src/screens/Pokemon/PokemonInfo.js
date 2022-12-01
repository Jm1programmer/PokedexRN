import React, {useEffect,useState} from "react";
import { Text, StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
import { COLORS } from "../../colors";

import PokemonAbout from "./PokemonInfo/About";


export default function PokemonInfo() {

    const [chosen, setChosen] = useState("About")
    function Menu() {
        return <>
        <View style={styles.Menu}>
        <View style={[styles.line, {backgroundColor: COLORS.gray, opacity: 0.2, alignSelf: 'center', width: '100%' }]}></View>
            <MenuAbout />
            <MenubaseStats />
            <MenuEvolution />
            <MenuMoves />
        </View>
       
        </>
    }

    function MenuAbout() {
        if (chosen === 'About') {
        return <>
         <TouchableOpacity style={styles.TextMenuView}>
            <Text style={styles.TextMenu}>About</Text>
            <View style={[styles.line, {backgroundColor: COLORS.purple,  alignSelf: 'center', width: '90%' }]}></View>
            </TouchableOpacity>
        </>
        } else {
            return <>
            <TouchableOpacity style={styles.TextMenuView} onPress={ () => {
                setChosen('About')
            }}>
               <Text style={styles.TextMenu}>About</Text>
               </TouchableOpacity>
           </>
        }

    }

    function MenubaseStats() {
        if (chosen === 'BaseStats') {
        return <>
         <TouchableOpacity style={styles.TextMenuView}>
            <Text style={styles.TextMenu}>Base Stats</Text>
            <View style={[styles.line, {backgroundColor: COLORS.purple,  alignSelf: 'center', width: '90%' }]}></View>
            </TouchableOpacity>
        </>
        } else {
            return <>
            <TouchableOpacity style={styles.TextMenuView} onPress={ () => {
                setChosen('BaseStats')
            }}>
               <Text style={styles.TextMenu}>Base Stats</Text>
               </TouchableOpacity>
           </>
        }

    }

    function MenuEvolution() {
        if (chosen === 'Evolution') {
        return <>
         <TouchableOpacity style={styles.TextMenuView}>
            <Text style={styles.TextMenu}>Evolution</Text>
            <View style={[styles.line, {backgroundColor: COLORS.purple,  alignSelf: 'center', width: '90%' }]}></View>
            </TouchableOpacity>
        </>
        } else {
            return <>
            <TouchableOpacity style={styles.TextMenuView}  onPress={ () => {
                setChosen('Evolution')
            }}>
               <Text style={styles.TextMenu}>Evolution</Text>
               </TouchableOpacity>
           </>
        }

    }

    function MenuMoves() {
        if (chosen === 'Moves') {
        return <>
         <TouchableOpacity style={styles.TextMenuView}>
            <Text style={styles.TextMenu}>Moves</Text>
            <View style={[styles.line, {backgroundColor: COLORS.purple,  alignSelf: 'center', width: '90%' }]}></View>
            </TouchableOpacity>
        </>
        } else {
            return <>
            <TouchableOpacity style={styles.TextMenuView} onPress={ () => {
                setChosen('Moves')
            }}>
               <Text style={styles.TextMenu}>Moves</Text>
               </TouchableOpacity>
           </>
        }

    }

  return <>
    
    <View style={styles.PokemonInfo}>
    <Menu />
    <PokemonAbout />
    </View>
  

 
  </>
}

const styles = StyleSheet.create({
    PokemonInfo: {
        width: '100%',
        height: '100%',
        backgroundColor: COLORS.White,
     
     
    },

    Menu: {
        flexDirection: 'row',
        marginVertical: 40,
        justifyContent: 'space-between'
      
    },
    TextMenuView: {
        minWidth: 1,
        height: 30,
    },
    TextMenu: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 15,
        color: COLORS.gray,
        paddingHorizontal: 15,
        
    },
    line: {
        width: '90%', height: 3, backgroundColor: COLORS.purple,
        alignSelf: 'center', 
        position: 'absolute',
        bottom: 0,
    }
})
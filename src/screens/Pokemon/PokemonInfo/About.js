import React, {useEffect,useState} from "react";
import { Text, StyleSheet, View, ScrollView } from "react-native";
import { COLORS } from "../../../colors";

import api from "../../../../services/api";

export default function PokemonAbout() {
  const [AboutText, setAbouText] = useState('')
  async function GetContent() {

  
    const baseUrl = 'https://pokeapi.co/api/v2';
      try {
          const resultado =  await api.get(`${baseUrl}/pokemon-species/2`)
          return resultado.data
  
      }
      
      catch (error) {
          console.log(error)
          return {}
      }
  }

  const getContent = async () => {
    const resultado = await GetContent()


    setAbouText(resultado.flavor_text_entries[0].flavor_text)
 }

    useEffect(() => {

    getContent()
    }, [])

  return <>
    
    <View style={styles.About}>
        
    <Text style={styles.TextAbout}>{`${AboutText}`.replace(/\r?\n|\r/gm, "")}</Text>
      

    </View>
  

 
  </>
}

const styles = StyleSheet.create({
   TextAbout: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 20,
    color: COLORS.Black,
    paddingHorizontal: 15,
   },
   
})
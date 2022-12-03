import React, {useEffect,useState} from "react";
import { Text, StyleSheet, View, ScrollView } from "react-native";
import { COLORS } from "../../../colors";

import api from "../../../../services/api";
import { useRoute } from "@react-navigation/native";
import LoadingPokeball from "../../../components/loadingPokeball";

export default function PokemonAbout() {

  const [DescText, setDescText] = useState(undefined)
  const [Height, setHeight] = useState(undefined)
  const [Weight, setWeight] = useState(undefined)

  const route = useRoute()
  const pokeNumber = route.params.pokeNumber


  async function GetDesc() {

  
    const baseUrl = 'https://pokeapi.co/api/v2';
      try {
          const resultado =  await api.get(`${baseUrl}/pokemon-species/${pokeNumber}`)
          return resultado.data
  
      }
      
      catch (error) {
          console.log(error)
          return {}
      }
  }

  async function GetPokemonCaracteristics() {

  
    const baseUrl = 'https://pokeapi.co/api/v2';
      try {
          const resultado =  await api.get(`${baseUrl}/pokemon/${pokeNumber}`)
          return resultado.data
  
      }
      
      catch (error) {
          console.log(error)
          return {}
      }
  };

  

  const getContent = async () => {
    const DescRes = await GetDesc()
    const CaracteristicsRes = await GetPokemonCaracteristics()


    


    setDescText(DescRes.flavor_text_entries[1].flavor_text)
    setHeight(CaracteristicsRes.height / 10)
    setWeight(CaracteristicsRes.weight / 10)
 }

    useEffect(() => {

    getContent()
    }, [])

    function HeightandWeight() {
      return <>
        <View style={styles.HeightandWeightCart}>
        <View style={styles.HeightandWeightView}>
                  <Text style={styles.TitleHeightandWeight}>Height</Text>
                  <Text style={styles.TextHeightandWeight}>{`${Height} m`}</Text>
              </View>
    
    
    
            <View style={styles.HeightandWeightView}>
               <Text style={styles.TitleHeightandWeight}>Weight</Text>
               <Text style={styles.TextHeightandWeight}>{`${Weight} kg`}</Text>
            </View>
 
        
        </View>
      </>
    }

    function AllContentLoading() {

        if (Height || Weight || DescText != undefined)  {
          return <>
           <AboutTextLoading />
          <HeightandWeight />
         
            </>
        } else {
            return <LoadingPokeball />
        }
    }


    function AboutTextLoading() {
      if (DescText != undefined) {
        return  <Text style={styles.TextAbout}>{`${DescText}`.replace(/\r?\n|\r/gm, "")}</Text>
      } else {
        return <LoadingPokeball />
      }
    }

  return <>
    
    <View style={styles.About}>
        
 <AllContentLoading />
    
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
   HeightandWeightCart: {
    width: '90%',
    height: 90,
    elevation: 10,
    backgroundColor: COLORS.White,
    alignSelf: 'center',
    marginVertical: 20,
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 35,
    paddingVertical: 10,
   },

   HeightandWeightView: {
    alignItems: 'center',
   },

   TitleHeightandWeight: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 15,
    color: COLORS.gray,

   }, 

   TextHeightandWeight: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 15,
    color: COLORS.Black,
   },
   
})
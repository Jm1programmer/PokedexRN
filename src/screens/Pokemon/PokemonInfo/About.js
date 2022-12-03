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
  const [Ability1, setAbility1] = useState(undefined)
  const [Ability2, setAbility2] = useState(undefined)

  const [Weakness1, setWeakness1] = useState(undefined)
  const [Weakness2, setWeakness2] = useState(undefined)
  const [Weakness3, setWeakness3] = useState(undefined)
  const [Weakness4, setWeakness4] = useState(undefined)



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

  async function GetWekness() {

  
    const baseUrl = 'https://pokeapi.co/api/v2';
      try {
          const resultado =  await api.get(`${baseUrl}/type/${pokeNumber}`)
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
 
    setAbility1(CaracteristicsRes.abilities[0].ability.name)
    if ( CaracteristicsRes.abilities[1]) {
    setAbility2(CaracteristicsRes.abilities[1].ability.name)
    }

    const Weakness = await GetWekness()
    if (Weakness.damage_relations) {
    if (Weakness.damage_relations.double_damage_from[0]) {
    setWeakness1(Weakness.damage_relations.double_damage_from[0].name)
    if (Weakness.damage_relations.double_damage_from[1]) {
      
    setWeakness2(Weakness.damage_relations.double_damage_from[1].name)
    if (Weakness.damage_relations.double_damage_from[2]) {
   setWeakness3(Weakness.damage_relations.double_damage_from[2].name)
    if (Weakness.damage_relations.double_damage_from[3]) {
    setWeakness4(Weakness.damage_relations.double_damage_from[3].name)
      	        }
          }
        }
    }
  }

    setDescText(DescRes.flavor_text_entries[5].flavor_text)
    setHeight(CaracteristicsRes.height / 10)
    setWeight(CaracteristicsRes.weight / 10)
 }

    useEffect(() => {

    getContent()
    }, [])

    function HeightandWeight() {
      return <>
        <View style={styles.Cart}>
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
              <View style={styles.Abilities}>
               <Text style={[styles.TitleHeightandWeight, {color: COLORS.gray, padding: 20, alignSelf: 'center'}]}>{`Abilities: ${Ability1}, ${Ability2}`}</Text>
        
               </View>

               

        </View>

        
      </>
    }

    function Weakness() {
      return <View style={styles.Weakness}>
                  <Text style={styles.Title}>Weakness</Text>

                  <View style={styles.PokemonTypes}>
      <View style={[styles.type, {backgroundColor: COLORS[Weakness1]}]}>
          <Text style={styles.typeText}>{Weakness1}</Text>
      </View>

      <View style={[styles.type, {backgroundColor: COLORS[Weakness2]}]}>
          <Text style={styles.typeText}>{Weakness2}</Text>
      </View>

      <View style={[styles.type, {backgroundColor: COLORS[Weakness3]}]}>
          <Text style={styles.typeText}>{Weakness3}</Text>
      </View>

      <View style={[styles.type, {backgroundColor: COLORS[Weakness4]}]}>
          <Text style={styles.typeText}>{Weakness4}</Text>
      </View>
    </View>
               </View>
    }

    function AllContentLoading() {

        if (Height || Weight || DescText || Ability1 || Ability2 != undefined)  {
          return <>
           <AboutTextLoading />
          <HeightandWeight />
          <Weakness />
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

  About: {
    paddingHorizontal: 15,
  },
   TextAbout: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 20,
    color: COLORS.Black,
  
   },
  Cart: {
    width: '90%',
    minHeight: 90,
    elevation: 10,
    backgroundColor: COLORS.White,
    alignSelf: 'center',
    marginVertical: 20,
    borderRadius: 6,

 
  
   },

   HeightandWeightCart: {
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

   Title: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
    color: COLORS.Black,
   
},

Weakness: {
  
},

PokemonTypes: {
  marginVertical: 10,

  flexDirection: 'row',
},
type: {
  minWidth: 90,
  height: 30,
  borderRadius: 16,
  alignItems: 'center',
  justifyContent: 'center',
  marginHorizontal: 2,
},

typeText: {
  fontFamily: 'Montserrat-Regular',
  fontSize: 15,
  color: COLORS.White
},
})
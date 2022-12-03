import { useRoute } from "@react-navigation/native";
import React, {useEffect,useState} from "react";
import { Text, StyleSheet, View, ScrollView } from "react-native";
import { COLORS } from "../../../colors";

import api from "../../../../services/api";


export default function PokemonBaseStats({ Hp ,speed, special_attack ,special_defense, Attack, Defense}) {
    const route = useRoute()
    const pokeNumber = route.params.pokeNumber

    
    const name = route.params.name;

    
  

    async function GetPokemonStats() {

  
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
    
     }
    
        useEffect(() => {
    
        getContent()
        }, [])

        //Max 255
if (Hp || Attack || Defense || special_attack || special_defense || speed != undefined) {

    const total = (Hp + Attack + Defense + special_attack + special_defense + speed)
   
  return <>
    

    
    <View style={styles.BaseStats}>


        
       <View style={styles.Stats}>
        <Text style={styles.statsName}>HP</Text>
        <Text style={styles.statsNumber}>{Hp}</Text>
        <View style={styles.Graphic}>
        <View style={{width: 255 / 1.2, height: 6, backgroundColor: COLORS.gray, opacity: 0.2}} />
        <View style={{width: Hp / 1.2, height: 6, backgroundColor: COLORS.bug, position: 'absolute' }}></View>
          
        </View>
      
       </View>

       <View style={styles.Stats}>
        <Text style={styles.statsName}>Attack</Text>
        <Text style={styles.statsNumber}>{Attack}</Text>


        <View style={styles.Graphic}>
        <View style={{width: 255 / 1.2, height: 6, backgroundColor: COLORS.gray, opacity: 0.2}} />
        <View style={{width: Attack / 1.2, height: 6, backgroundColor: COLORS.bug, position: 'absolute' }}></View>
          
        </View>
       
       </View>

       <View style={styles.Stats}>
        <Text style={styles.statsName}>Defense</Text>
        <Text style={styles.statsNumber}>{Defense}</Text>

        <View style={styles.Graphic}>
        <View style={{width: 255 / 1.2, height: 6, backgroundColor: COLORS.gray, opacity: 0.2}} />
        <View style={{width: Defense / 1.2, height: 6, backgroundColor: COLORS.bug, position: 'absolute' }}></View>
          
        </View>
      
       </View>

       <View style={styles.Stats}>
        <Text style={styles.statsName}>Sp. Atk</Text>
        <Text style={styles.statsNumber}>{special_attack}</Text>

        <View style={styles.Graphic}>
        <View style={{width: 255 / 1.2, height: 6, backgroundColor: COLORS.gray, opacity: 0.2}} />
        <View style={{width: special_attack / 1.2, height: 6, backgroundColor: COLORS.bug, position: 'absolute' }}></View>
          
        </View>
        
       </View>

       <View style={styles.Stats}>
        <Text style={styles.statsName}>Sp. Def</Text>
        <Text style={styles.statsNumber}>{special_defense}</Text>

        <View style={styles.Graphic}>
        <View style={{width: 255 / 1.2, height: 6, backgroundColor: COLORS.gray, opacity: 0.2}} />
        <View style={{width: special_defense / 1.2, height: 6, backgroundColor: COLORS.bug, position: 'absolute' }}></View>
          
        </View>
        
       </View>

       <View style={styles.Stats}>
        <Text style={styles.statsName}>Speed</Text>
        <Text style={styles.statsNumber}>{speed}</Text>


        <View style={styles.Graphic}>
        <View style={{width: 255 / 1.2, height: 6, backgroundColor: COLORS.gray, opacity: 0.2}} />
        <View style={{width: speed / 1.2, height: 6, backgroundColor: COLORS.bug, position: 'absolute' }}></View>
          
        </View>
       
       </View>

       <View style={styles.Stats}>
        <Text style={styles.statsName}>Total</Text>
        <Text style={styles.statsNumber}>{total}</Text>
        <View style={styles.Graphic}>
        <View style={{width: 255 / 1.2, height: 6, backgroundColor: COLORS.gray, opacity: 0.2}} />
        <View style={{width: (total / 6) / 1.2, height: 6, backgroundColor: COLORS.bug, position: 'absolute' }}></View>
          
        </View>

            
        
       </View>

       <View style={styles.Explication}>
        <Text style={styles.Title}>Base stats</Text>
        <Text style={[styles.statsName, {width: '100%', fontSize: 15, marginTop: 10,}]}>{`The ${name} base stats`}</Text>
    </View>
   

    </View>
  

 
  </>
}
}

const styles = StyleSheet.create({
    BaseStats: {
       marginHorizontal: 20,
        backgroundColor: COLORS.White,
        
    },
    Stats: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 30,
    },

    statsName: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 18,
        color: COLORS.gray,
      width: 100,
    },

    statsNumber: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 15,
        color: COLORS.Black,
    
    },

    Title: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 20,
        color: COLORS.Black,
       
    },
    Explication: {
        marginTop: 20,
    }
    
})
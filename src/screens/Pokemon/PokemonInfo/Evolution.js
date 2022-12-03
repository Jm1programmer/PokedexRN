import { useRoute } from "@react-navigation/native";
import React, {useEffect,useState} from "react";
import { Text, StyleSheet, View, ScrollView, Image } from "react-native";
import { COLORS } from "../../../colors";

import LoadingPokeball from "../../../components/loadingPokeball";

import api from "../../../../services/api";

import PokeBallBackground from '../../../../assets/pokeballBackground.png'

import Icon from 'react-native-vector-icons/dist/Feather';

export default function PokemonEvolution({EvolutionChainNumber}) {

    const route = useRoute()
    const pokeNumber = route.params.pokeNumber
    const [EvolutionChain, setEvolutionChain] = useState()

    const [PokemonFirstEvolutionName, setPokemonFirstEvolutionName] = useState('')
    const [PokemonSecondEvolutionName, setPokemonSecondEvolutionName] = useState('')
    const [PokemonThirdEvolutionName, setPokemonThirdEvolutionName] = useState('')

    const [PokemonFirstEvolutionImage, setPokemonFirstEvolutionImage] = useState('')
    const [PokemonSecondEvolutionImage, setPokemonSecondEvolutionImage] = useState('')
    const [PokemonThirdEvolutionImage, setPokemonThirdEvolutionImage] = useState('')

        const EvolutionNumber = EvolutionChainNumber

  
      
  
      async function GetPokemonEvolutionChain() {
        const baseUrl = 'https://pokeapi.co/api/v2';
          try {
              const resultado =  await api.get(`${baseUrl}/evolution-chain/${EvolutionNumber}`)
           
              return resultado.data
      
          }
          
          catch (error) {
              console.log(error)
              return {}
          }
      }
      

 
      const getContent = async () => {
        const Res = await GetPokemonEvolutionChain()
        setEvolutionChain(Res)

       

        
     }

     const GetEvolution = () => {
        if (EvolutionChain != undefined) {
            if (EvolutionChain.chain) {
           //1 evolucão
                setPokemonFirstEvolutionName((EvolutionChain.chain.species.name).charAt(0).toUpperCase() + EvolutionChain.chain.species.name.slice(1))

                setPokemonFirstEvolutionImage((EvolutionChain.chain.species.url).replace('https://pokeapi.co/api/v2/pokemon-species/','').replace('/', ''))

                if (EvolutionChain.chain.evolves_to[0]) {
                    
                //2 evolucão

                    setPokemonSecondEvolutionName((EvolutionChain.chain.evolves_to[0].species.name).charAt(0).toUpperCase() + EvolutionChain.chain.evolves_to[0].species.name.slice(1))

                    setPokemonSecondEvolutionImage((EvolutionChain.chain.evolves_to[0].species.url).replace('https://pokeapi.co/api/v2/pokemon-species/','').replace('/', ''))

                    if (EvolutionChain.chain.evolves_to[0].evolves_to[0]) {

                 //3 Evolucao
                 setPokemonThirdEvolutionImage((EvolutionChain.chain.evolves_to[0].evolves_to[0].species.url).replace('https://pokeapi.co/api/v2/pokemon-species/','').replace('/', ''))
                 
                    setPokemonThirdEvolutionName((EvolutionChain.chain.evolves_to[0].evolves_to[0].species.name).charAt(0).toUpperCase() + EvolutionChain.chain.evolves_to[0].evolves_to[0].species.name.slice(1))
                    
                    }
            }
            }
        }
     }

 
    
        useEffect(() => {
           
        getContent()

        
        
        },  [])

        useEffect(() => {
            GetEvolution()
        }, [EvolutionChain], [])

        function Arrow() {
            return <Icon name="arrow-right-circle" size={30} color={COLORS.gray} />
        }

      

        function Evolution() {

            if ((PokemonFirstEvolutionImage === '') && (PokemonSecondEvolutionImage === '') && (PokemonThirdEvolutionImage === '')) {
                return <LoadingPokeball />
            }

            if (PokemonFirstEvolutionImage && (PokemonSecondEvolutionImage === '') && (PokemonThirdEvolutionImage === '') ) {
                return <>
                 <View style={styles.Evolution}>
                    <Text style={styles.Title}>This pokemon do not have any Evolution</Text>

            
            </View>
                </>
            }  

            if (PokemonFirstEvolutionImage && PokemonSecondEvolutionImage && ((PokemonThirdEvolutionImage === '') )) {
                return <>
                 <View style={styles.Evolution}>

                 <View style={styles.ViewPokeImage}>
                 <Image style={styles.PokeBallBackground} source={PokeBallBackground} resizeMode={'contain'} />
                <Image style={styles.PokemonImage} source={{uri: `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${`00${PokemonFirstEvolutionImage}`.slice(-3)}.png`}} />
                <Text style={styles.PokeName}>{PokemonFirstEvolutionName}</Text>
                </View>
                <Arrow />

             <View style={styles.ViewPokeImage}> 
             <Image style={styles.PokeBallBackground} source={PokeBallBackground} resizeMode={'contain'} />
            <Image style={styles.PokemonImage} source={{uri: `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${`00${PokemonSecondEvolutionImage}`.slice(-3)}.png`}} />
            <Text style={styles.PokeName}>{PokemonSecondEvolutionName}</Text>
            </View>  

            </View>
                </>
            }  

            if (PokemonFirstEvolutionImage && PokemonSecondEvolutionImage && PokemonThirdEvolutionImage)  {
                return <>
                 <View style={styles.Evolution}>

                    <View style={styles.ViewPokeImage}>
                        <Image style={styles.PokeBallBackground} source={PokeBallBackground} resizeMode={'contain'} />
                        <Image style={styles.PokemonImage} source={{uri: `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${`00${PokemonFirstEvolutionImage}`.slice(-3)}.png`}} />
                        <Text style={styles.PokeName}>{PokemonFirstEvolutionName}</Text>
            </View>

            <Arrow />
                
            <View style={styles.ViewPokeImage}>
                <Image style={styles.PokeBallBackground} source={PokeBallBackground} resizeMode={'contain'} />
                 <Image style={styles.PokemonImage} source={{uri: `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${`00${PokemonSecondEvolutionImage}`.slice(-3)}.png`}} />
                 <Text style={styles.PokeName}>{PokemonSecondEvolutionName}</Text>
            </View>
            
            </View>

            <View style={styles.Evolution}>

            <View style={styles.ViewPokeImage}>
                 <Image style={styles.PokeBallBackground} source={PokeBallBackground} resizeMode={'contain'} />
                 <Image style={styles.PokemonImage} source={{uri: `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${`00${PokemonSecondEvolutionImage}`.slice(-3)}.png`}} />
                 
                 <Text style={styles.PokeName}>{PokemonSecondEvolutionName}</Text>
                </View>
            <Arrow />
            <View style={styles.ViewPokeImage}>
                    <Image style={styles.PokeBallBackground} source={PokeBallBackground} resizeMode={'contain'} />
                    <Image style={styles.PokemonImage} source={{uri: `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${`00${PokemonThirdEvolutionImage}`.slice(-3)}.png`}} />

                    <Text style={styles.PokeName}>{PokemonThirdEvolutionName}</Text>
                </View>
            
            </View>
                </>
            }  


           
        }

  return <>
    
    <View style={styles.PokeEvolution}>
        <Text style={styles.Title}>Evolution Chain</Text>

        <Evolution />

    </View>
  

 
  </>
}

const styles = StyleSheet.create({
    PokeEvolution: {
       
        
    },

    Title: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 20,
        color: COLORS.Black,
        paddingHorizontal: 15,
    },

    Evolution: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
    },

    ViewPokeImage: {
        width: 90,
        height: 90,
     
        justifyContent: 'center',
     
        borderRadius: 100,
    },

    PokeBallBackground: {
        position: 'absolute',
        width: 100,
        height: 100,
        alignSelf: 'center',
    },
    PokemonImage: {
        width: 90,
        height: 90,
        opacity: 1,
        alignSelf: 'center',
    },
    PokeName: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 14,
        color: COLORS.Black,
        alignSelf: 'center',
        position: 'absolute',
        bottom: -22,
     
    },
   
})
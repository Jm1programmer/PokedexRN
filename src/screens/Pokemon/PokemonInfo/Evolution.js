import { useNavigation, useRoute } from "@react-navigation/native";
import React, {useEffect,useState} from "react";
import { Text, StyleSheet, View, ScrollView, Image, TouchableOpacity, Button } from "react-native";
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

    const [PokemonFirstEvolutionMinLevel, setPokemonFirstEvolutionMinLevel] =useState('')

    const [PokemonSecondEvolutionMinLevel, setPokemonSecondEvolutionMinLevel] =useState('')

    const [PokemonFirstEvolutionStone, setPokemonFirstEvolutionStone] =useState('')
  
    const [PokemonSecondEvolutionStone, setPokemonSecondEvolutionStone] =useState('')

    const [PokemonFirstEvolutionTrigger, setPokemonFirstEvolutionTrigger] = useState('')

    const [PokemonSecondEvolutionTrigger, setPokemonSecondEvolutionTrigger] = useState('')

    const [EvoChain, setEvochain] = useState([])

    const [EvoLenght, setEvolenght] = useState()
    const [EvoArray, setEvoArray] = useState([])
  
   
 

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

                setEvolenght(EvolutionChain.chain.evolves_to.length)
                   
                    if (EvolutionChain.chain.evolves_to.length > 1) {
                        for (let i = 0;i < (EvolutionChain.chain.evolves_to.length); i++) {
                           const Eveelotution = {
                               pokemonName: (EvolutionChain.chain.evolves_to[i].species.name).charAt(0).toUpperCase() + EvolutionChain.chain.evolves_to[i].species.name.slice(1),

                               Image:(EvolutionChain.chain.evolves_to[i].species.url).replace('https://pokeapi.co/api/v2/pokemon-species/','').replace('/', ''),

                               minLevel: EvolutionChain.chain.evolves_to[i].evolution_details[0].min_level,

                               ...EvolutionChain.chain.evolves_to[i].evolution_details[0].item && { stone: (EvolutionChain.chain.evolves_to[i].evolution_details[0].item.name).charAt(0).toUpperCase() + EvolutionChain.chain.evolves_to[i].evolution_details[0].item.name.slice(1) },

                             ...EvolutionChain.chain.evolves_to[0]&&{trigger: ((EvolutionChain.chain.evolves_to[i].evolution_details[0].trigger.name).charAt(0).toUpperCase() + EvolutionChain.chain.evolves_to[i].evolution_details[0].trigger.name.slice(1)  ) }
                             }
                             
                             setEvochain(prev => [...prev, Eveelotution])
                         
                        }
                    }  else {
                       
                    
                     
                    setPokemonSecondEvolutionName((EvolutionChain.chain.evolves_to[0].species.name).charAt(0).toUpperCase() + EvolutionChain.chain.evolves_to[0].species.name.slice(1))

                    setPokemonSecondEvolutionImage((EvolutionChain.chain.evolves_to[0].species.url).replace('https://pokeapi.co/api/v2/pokemon-species/','').replace('/', ''))

                    setPokemonFirstEvolutionMinLevel(EvolutionChain.chain.evolves_to[0].evolution_details[0].min_level)


                    if (EvolutionChain.chain.evolves_to[0].evolution_details[0].item) {
                    setPokemonFirstEvolutionStone((EvolutionChain.chain.evolves_to[0].evolution_details[0].item.name).charAt(0).toUpperCase() + EvolutionChain.chain.evolves_to[0].evolution_details[0].item.name.slice(1))
                    }

                    if (EvolutionChain.chain.evolves_to[0].evolves_to[0]) {
                    setPokemonFirstEvolutionTrigger((EvolutionChain.chain.evolves_to[0].evolves_to[0].evolution_details[0].trigger.name).charAt(0).toUpperCase() + EvolutionChain.chain.evolves_to[0].evolves_to[0].evolution_details[0].trigger.name.slice(1))
                    }

                }

                    if (EvolutionChain.chain.evolves_to[0].evolves_to[0]) {

                 //3 Evolucao
                 setPokemonThirdEvolutionImage((EvolutionChain.chain.evolves_to[0].evolves_to[0].species.url).replace('https://pokeapi.co/api/v2/pokemon-species/','').replace('/', ''))

                 setPokemonSecondEvolutionMinLevel(EvolutionChain.chain.evolves_to[0].evolves_to[0].evolution_details[0].min_level)
                        
                    setPokemonThirdEvolutionName((EvolutionChain.chain.evolves_to[0].evolves_to[0].species.name).charAt(0).toUpperCase() + EvolutionChain.chain.evolves_to[0].evolves_to[0].species.name.slice(1))

                    if (EvolutionChain.chain.evolves_to[0].evolves_to[0]) {
                    setPokemonSecondEvolutionTrigger((EvolutionChain.chain.evolves_to[0].evolves_to[0].evolution_details[0].trigger.name).charAt(0).toUpperCase() + EvolutionChain.chain.evolves_to[0].evolves_to[0].evolution_details[0].trigger.name.slice(1))
                    }
                    if (EvolutionChain.chain.evolves_to[0].evolves_to[0].evolution_details[0].item) {
                        setPokemonSecondEvolutionStone((EvolutionChain.chain.evolves_to[0].evolves_to[0].evolution_details[0].item.name).charAt(0).toUpperCase() + EvolutionChain.chain.evolves_to[0].evolves_to[0].evolution_details[0].item.name.slice(1))
                        }
                    
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

        function ArrowFirst() {

            if (PokemonFirstEvolutionMinLevel != null) {
            return <View style={styles.Arrow}>
                <Icon name="arrow-right-circle" size={30} color={COLORS.gray} />
                <Text style={styles.MinLvl}>{`Lvl ${PokemonFirstEvolutionMinLevel}`}</Text>
            </View>
            } else if ((PokemonFirstEvolutionMinLevel == null) && (PokemonFirstEvolutionStone) ) {
                return <View style={styles.Arrow}>
                <Icon name="arrow-right-circle" size={30} color={COLORS.gray} />
                <Text style={styles.MinLvl}>{PokemonFirstEvolutionStone}</Text>
            </View>
            } else {
                return <View style={styles.Arrow}>
                <Icon name="arrow-right-circle" size={30} color={COLORS.gray} />
                <Text style={styles.MinLvl}>{PokemonFirstEvolutionTrigger}</Text>
            </View>
            }

        }

        function ArrowSecond() {
            if (PokemonSecondEvolutionMinLevel != null) {
            return <View style={styles.Arrow}>
            <Icon name="arrow-right-circle" size={30} color={COLORS.gray} />
            <Text style={styles.MinLvl}>{`Lvl ${PokemonSecondEvolutionMinLevel}`}</Text>
            </View>
            } else  if ((PokemonSecondEvolutionMinLevel == null) && (PokemonSecondEvolutionStone) )  {
                return <View style={styles.Arrow}>
                <Icon name="arrow-right-circle" size={30} color={COLORS.gray} />
                <Text style={styles.MinLvl}>{PokemonSecondEvolutionStone}</Text>
                 </View>
            } else  {
                return <View style={styles.Arrow}>
                <Icon name="arrow-right-circle" size={30} color={COLORS.gray} />
                <Text style={styles.MinLvl}>{PokemonSecondEvolutionTrigger}</Text>
                 </View>
            }
        }

       
       
      function EveelotutionContent() {
        return EvoChain.map((item) => {

            function Arrow() {
                

                    if (item.minLevel != null) {
                    return <View style={styles.Arrow}>
                        <Icon name="arrow-right-circle" size={30} color={COLORS.gray} />
                        <Text style={styles.MinLvl}>{`Lvl ${item.minLevel}`}</Text>
                    </View>
                    } else if ((item.minLevel == null) && (item.stone) ) {
                        return <View style={styles.Arrow}>
                        <Icon name="arrow-right-circle" size={30} color={COLORS.gray} />
                        <Text style={styles.MinLvl}>{item.stone}</Text>
                    </View>
                    } else {
                        return <View style={styles.Arrow}>
                        <Icon name="arrow-right-circle" size={30} color={COLORS.gray} />
                        <Text style={styles.MinLvl}>{item.trigger}</Text>
                      
                     
                    </View>
                    }
        
                
            }
          
            return (
                <View style={styles.Evolution}>

                <TouchableOpacity style={styles.ViewPokeImage}>
                <Image style={styles.PokeBallBackground} source={PokeBallBackground} resizeMode={'contain'} />
               <Image style={styles.PokemonImage} source={{uri: `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${`00${PokemonFirstEvolutionImage}`.slice(-3)}.png`}} />
               <Text style={styles.PokeName}>{PokemonFirstEvolutionName}</Text>
               </TouchableOpacity>
               
               <Arrow />

            <TouchableOpacity style={styles.ViewPokeImage}> 
            <Image style={styles.PokeBallBackground} source={PokeBallBackground} resizeMode={'contain'} />
           <Image style={styles.PokemonImage} source={{uri: `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${`00${item.Image}`.slice(-3)}.png`}} />
           <Text style={styles.PokeName}>{item.pokemonName}</Text>
           </TouchableOpacity>  

           </View>
              
            );
           
        });
      }

        function Evolution() {

            
            const navigation = useNavigation()

            if (EvoLenght > 1) {
                return <>
                <EveelotutionContent />
                </>
         }

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

                 <TouchableOpacity style={styles.ViewPokeImage}>
                 <Image style={styles.PokeBallBackground} source={PokeBallBackground} resizeMode={'contain'} />
                <Image style={styles.PokemonImage} source={{uri: `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${`00${PokemonFirstEvolutionImage}`.slice(-3)}.png`}} />
                <Text style={styles.PokeName}>{PokemonFirstEvolutionName}</Text>
                </TouchableOpacity>
                <ArrowFirst />

             <TouchableOpacity style={styles.ViewPokeImage}> 
             <Image style={styles.PokeBallBackground} source={PokeBallBackground} resizeMode={'contain'} />
            <Image style={styles.PokemonImage} source={{uri: `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${`00${PokemonSecondEvolutionImage}`.slice(-3)}.png`}} />
            <Text style={styles.PokeName}>{PokemonSecondEvolutionName}</Text>
            </TouchableOpacity>  

            </View>
                </>
            }  

            if (PokemonFirstEvolutionImage && PokemonSecondEvolutionImage && PokemonThirdEvolutionImage)  {
                return <>
                 <View style={styles.Evolution}>

                    <TouchableOpacity style={styles.ViewPokeImage}>
                        <Image style={styles.PokeBallBackground} source={PokeBallBackground} resizeMode={'contain'} />
                        <Image style={styles.PokemonImage} source={{uri: `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${`00${PokemonFirstEvolutionImage}`.slice(-3)}.png`}} />
                        <Text style={styles.PokeName}>{PokemonFirstEvolutionName}</Text>
            </TouchableOpacity>

            <ArrowFirst />
                
            <TouchableOpacity style={styles.ViewPokeImage}>
                <Image style={styles.PokeBallBackground} source={PokeBallBackground} resizeMode={'contain'} />
                 <Image style={styles.PokemonImage} source={{uri: `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${`00${PokemonSecondEvolutionImage}`.slice(-3)}.png`}} />
                 <Text style={styles.PokeName}>{PokemonSecondEvolutionName}</Text>
            </TouchableOpacity>
            
            </View>

            <View style={styles.Evolution}>

            <TouchableOpacity style={styles.ViewPokeImage}>
                 <Image style={styles.PokeBallBackground} source={PokeBallBackground} resizeMode={'contain'} />
                 <Image style={styles.PokemonImage} source={{uri: `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${`00${PokemonSecondEvolutionImage}`.slice(-3)}.png`}} />
                 
                 <Text style={styles.PokeName}>{PokemonSecondEvolutionName}</Text>
                </TouchableOpacity>
            <ArrowSecond />
            <TouchableOpacity style={styles.ViewPokeImage}>
                    <Image style={styles.PokeBallBackground} source={PokeBallBackground} resizeMode={'contain'} />
                    <Image style={styles.PokemonImage} source={{uri: `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${`00${PokemonThirdEvolutionImage}`.slice(-3)}.png`}} />

                    <Text style={styles.PokeName}>{PokemonThirdEvolutionName}</Text>
                </TouchableOpacity>
            
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
        fontSize: 13,
        color: COLORS.Black,
        alignSelf: 'center',
        position: 'absolute',
        bottom: -22,
        
    },

    Arrow: {
        alignItems: 'center',

    },
    MinLvl: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 13,
        color: COLORS.gray,
        alignSelf: 'center',
    },
   
})
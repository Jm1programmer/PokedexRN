
import api from "./api";

export async function GetContent() {
  const baseUrl = 'https://pokeapi.co/api/v2/';
    try {
        const resultado =  await api.get(`${baseUrl}pokemon/bulbasaur`)
        console.log(resultado.data.types[0].type.name)
        return resultado.data
        
    }
    
    catch (error) {
        console.log(error)
        return {}
    }
};
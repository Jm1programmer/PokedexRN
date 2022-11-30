
import api from "./api";

export async function GetContent() {
  const baseUrl = 'https://pokeapi.co/api/v2/';
    try {
        const resultado =  await api.get(`${baseUrl}pokemon?limit=100`)
        console.log(resultado.data)
        return resultado.data
        
    }
    
    catch (error) {
        console.log(error)
        return {}
    }
};
import React, {  useState } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Pokedex from "./screens/Pokedex";
import Pokemon from "./screens/Pokemon";

const Stack = createNativeStackNavigator();







export default function StackRoutes() {

    return (
      <Stack.Navigator 
      screenOptions={{
    headerShown: false,
  }}
    
  >
          <>
          <Stack.Screen name="Pokedex" component={Pokedex} 
         
           />

          <Stack.Screen name="Pokemon" component={Pokemon} 
                  
                  />
          </>
      </Stack.Navigator>
    );

  

  
}


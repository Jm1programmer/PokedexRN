import { useRoute } from "@react-navigation/native";
import React, {useEffect,useState} from "react";
import { Text, StyleSheet, View, ScrollView } from "react-native";
import { COLORS } from "../../colors";




export default function Header() {
    const route = useRoute()

    const [image_url, setImage_url] = useState(undefined)
   const type = route.params.type
  

  useEffect(() => {
    setImage_url(route.params.image)

  }, [])

  return <>
    
    <View style={[styles.Header, {backgroundColor: COLORS[type]}]}>
       
    </View>
  

 
  </>
}

const styles = StyleSheet.create({
    Header: {
        flex: 1,
        backgroundColor: COLORS.White,
    },
})
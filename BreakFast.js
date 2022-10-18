import {  View, StyleSheet, Pressable, Image, Text, ScrollView } from "react-native";
import pic from './assets/image.png'
import React,{useState} from "react";
import { FlatGrid } from 'react-native-super-grid';
import img from './assets/logo.png';
import back from './assets/arrow.png'


function BreakFast({navigation, route,setIsAddItem,test}){
  const [breakFast, setBreakFast] = useState([])
  const arrayOfBreakFast = []
  
  console.log(test)
   test.filter(breakFast=>breakFast.category ==="Break Fast").map((results)=>{
    arrayOfBreakFast.push(results)
  
   })

   console.log(arrayOfBreakFast)
   
   console.log('results', breakFast)
    
    return(
        <View style={styles.Container}>
            
            <View style={styles.menu}>
          
            <ScrollView>
              <View style={{height:'90%',}}>

            <FlatGrid
                    itemDimension={130}
                    data={arrayOfBreakFast}
                    style={styles.gridView}
                    // staticDimension={300}
                    // fixed
                    spacing={10}
                    renderItem={({ item }) => (
                      
                      <Pressable onPress={()=>navigation.navigate('addToCart',{
                        itemName: item.name,
                        itemPic: item.image,
                        itemAmount: item.amount,
                        
                          })}>
                           <View style={[styles.itemContainer]}>
                                      <View style={{backgroundColor:'yellow', height:100,borderRadius: 15}}>
                                        <Image style={{height:'100%', width:'100%',borderRadius: 15,}}  source={{uri: item.image}}/>   
                                      </View>
                                      <View style={{ height:60, bottom:0, position:"absolute", width:'100%'}}>
                                      <Text style={styles.itemName}>{item.name}</Text>
                                      <Text style={styles.itemName}>R{item.amount}</Text>
                                      </View>
                                    
                                  </View>
                        </Pressable>
                         
                         
                         )}
                         />
              </View>
          </ScrollView>
            </View>
            
        </View>
    )
}
export default BreakFast;
const styles = StyleSheet.create({
   Container: {
      backgroundColor: 'black',
      height: '100%'
   },
   Inner: {
     width: '100%',
     height: 150,
     display: "flex",
     flexDirection: 'row',
   },
   texts: {
     width: '100%',
     height: 80,
     alignSelf: 'center',
     marginTop: 20,
   
   },
   menu: {
      width: '100%',
      height: '100%',
      backgroundColor: 'black'
   },
   gridView: {
    marginTop: 5,
    flex: 1,
  },
  itemContainer: {
    
    borderRadius: 15,
    height:160,
  },
  itemName: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: 'black',
  },

   
})
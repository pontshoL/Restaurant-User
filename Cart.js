import {  View, StyleSheet, Pressable, Image, Text, ScrollView, Alert } from "react-native";
import pic from './assets/image.png'
import React,{useEffect, useState} from "react";
import img from './assets/logo.png';
import back from './assets/arrow.png'
import {addDoc,collection} from 'firebase/firestore'
import {db} from './firebase/config'
import Ionicons from '@expo/vector-icons/Ionicons';
import { AntDesign } from '@expo/vector-icons';


function Cart({navigation, data,setData}){
   const [price,setPrice] = useState(0)

useEffect(()=>{
   let temp = 0;
   for(let i = 0;i<data.length;i++){
      temp = temp + parseFloat(data[i].itemAmount * data[i].count)
      setPrice(temp)
   }
},[data])

const itemRef = collection(db,'oders')
   const placeOder = async()=>{
      const oder = await addDoc(itemRef,{oderId:Math.floor((Math.random() * 1000) + 1),oderItems:data,totalPrice:price}).then(()=>{
         setData([])
         setPrice(0)
      }).catch((e)=>{
         Alert.alert(e)
      })
   }
   
    return(
        <View style={styles.Container}>
             
                    <Pressable onPress={()=> navigation.navigate('UserHome')}>
                      <AntDesign name="leftcircle" size={24} color="orange" style={{marginTop:10, marginLeft: 10}}/>
                    </Pressable>
                  
              
             <View  style={{width: '100%', height: 300, backgroundColor: 'white'}}>
            
                 <Image source={img} style={{width: '100%', height: '100%'}} />
                   
             </View>
             {/* <Pressable onPress={() => navigation.navigate('UserHome',{})}>
                  <View style={{width: 30, height: 30, }}>
                        <Image source={back} style={{width: 30, height: 30, alignSelf: 'center', marginTop: 20, borderRadius: 150}}/>
                  </View>
            </Pressable> */}
            <ScrollView>

          {data?.map((item,index)=>  <View key={index} style={{marginTop: 50, width: '100%', height:50, display: 'flex', flexDirection: 'column'}}>
                     <View style={{width: 300, display: 'flex', flexDirection: 'row', marginHorizontal: 20}}>
                     <Image source={{uri: item.itemPic}} style={{width: 50, height: 50, marginHorizontal: 20}} />
                     <Text style={{color: 'white', alignItems: 'center', marginTop: 10, marginHorizontal: 20,width:100}}>{item.itemName}</Text>
                     <Text style={{color: 'white', alignItems: 'center', marginTop: 10, marginHorizontal: 20}}>{item.count}</Text>
                     <Text style={{color: 'white', alignItems: 'center', marginTop: 10, marginHorizontal: 20}}>{item.itemAmount}</Text>
                     <Text>{item.count}</Text>
                   
                  </View>
                
                 </View>)
                 }
                 
                   <View style={{ }}>
                  <View style={{flexDirection:'row',justifyContent:'space-between',width:'92%',marginTop:'12%'}}>
                     <Text style={{marginLeft:40,color:'#fff',alignSelf:'center'}}>Total</Text>
                   <Text style={{color:'#fff',alignSelf:'center'}}>R {price}</Text>
                  </View>
                       <Pressable onPress={()=>{
                           placeOder()
                       }} style={{width: 200, height: 40, alignSelf: 'center', backgroundColor: 'orange',marginVertical:30 }}>
                        
                           <Text style={{color: 'white', alignSelf: 'center', fontSize: 15, marginTop: 10}}>Place an Order</Text>
                       </Pressable>

                    </View>
      </ScrollView>
                        
            
        </View>
    )
}
export default Cart;
const styles = StyleSheet.create({
   Container: {
      backgroundColor: 'black',
      height: '100%'
   },
  
   texts: {
     width: '100%',
     height: 80,
     alignSelf: 'center',
     marginTop: 20,
   
   },
   menu: {
      width: '100%',
      backgroundColor: 'green',
      marginTop: 30,

   },
   
})
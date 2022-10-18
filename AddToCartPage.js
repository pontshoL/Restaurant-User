import {  View, StyleSheet, Pressable, Image, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import pic from './assets/image.png'
import React,{useEffect, useState} from "react";
import img from './assets/logo.png';
import back from './assets/arrow.png'


function AddToCart({navigation, route,setData,data}){
const [count, setCount] = useState(1);
const [verify,setVerify] = useState([])
  const decrement = () => setCount(prevCount =>{
    if(prevCount>1){
        return  prevCount - 1
    }else{
        return 1
    }
    
    });
  const increment = () => setCount(prevCount => prevCount + 1);
  const {
    itemName,
    itemPic,
    itemAmount} = route.params

useEffect(()=>{
setVerify( data.length>0? data.map((item)=>{
return item.itemName
}):[])
},[data])

  const addItemToCart = ()=>{
    if(verify.includes(itemName)){
        Alert.alert('item already added')
        return
    }else{
    Alert.alert('Confirm','add this item to cart?', [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        { text: 'OK', onPress: () => {navigation.navigate('Cart')
        setData(prev=>{
            return [...prev,{itemName,itemPic,itemAmount,count:count}]
        })} },
      ]);
}
  }

   

    return(
        <View style={styles.Container}>
            
             <View  style={{width: '100%', height: 300, backgroundColor: 'white'}}>
            
                 <Image source={{uri:itemPic}} style={{width: '100%', height: '100%'}} />
                   
             </View>
             <Pressable onPress={() => navigation.navigate('UserHome',{

             })}>
            <View style={{width: 30, height: 30, }}>
                  <Image source={back} style={{width: 30, height: 30, alignSelf: 'center', marginTop: 20, borderRadius: 150}}/>
            </View>
            </Pressable>
            
            <View style={styles.menu}>
                <Pressable onPress={()=>navigation.navigate('Cart')}>
                <View style={{marginTop: 10, }}>
                       <Text style={{color: 'white', fontSize: 20, alignSelf: 'center'}}>{itemName}</Text>
                       <Text style={{color: 'white', alignSelf: 'center'}}>Powered By Vannie's Restaurant</Text>
                       <Text style={{color: 'white', alignSelf: 'center',fontSize: 25}}>{itemAmount}</Text>
                       {/* <Text style={{color: 'white', alignSelf: 'center', marginTop: 40}}>How Many?</Text> */}
                     <View style={styles.countContainer}>
                                <Text style={{color: 'white'}}>Items: {count}</Text>
                            </View>
                            <View style={{flexDirection:'row',alignItems:'center',width:'50%',justifyContent:'space-between',alignSelf:'center',marginTop:10}}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={decrement}
                                >
                                <Text style={{color:'#fff',fontSize:16,fontWeight:'bold'}}> - </Text>
                            </TouchableOpacity> 

                            <TouchableOpacity
                                style={styles.button}
                                onPress={increment}
                                >
                                <Text style={{color:'#fff',fontSize:16,fontWeight:'bold'}}> + </Text>
                            </TouchableOpacity> 
                            </View>
                        <Pressable onPress={()=>{
                            addItemToCart()
                        }}>
                              <View style={{width: '50%', height: 40, alignSelf: 'center', backgroundColor: 'orange', marginTop:80 }}>
                           <Text style={{color: 'white', alignSelf: 'center', fontSize: 15, marginTop: 10}}>Add To Cart</Text>
                       </View>
                        </Pressable>        
                    </View>
                </Pressable>      
            </View>
            
        </View>
    )
}
export default AddToCart;
const styles = StyleSheet.create({
   Container: {
      backgroundColor: 'black',
      height: '100%',
      alignItems:'center'
   },
  
   texts: {
     width: '100%',
     height: 80,
     alignSelf: 'center',
     marginTop: 20,
   },
   menu: {
      width: '100%',
      backgroundColor: 'black',
      marginTop: 30
   },
   button: {
    alignItems: "center",
    padding: 15,
    backgroundColor: 'orange',
    marginLeft: 0
  },
  countContainer: {
    alignItems: "center",
    padding: 10
  }
   
})
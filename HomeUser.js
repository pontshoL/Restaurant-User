import {  View, StyleSheet, Pressable, Image, Text, ScrollView } from "react-native";
import pic from './assets/image.png'
import { FlatGrid } from 'react-native-super-grid'
import img from './assets/logo.png'
import React, { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from './firebase/config'
import Ionicons from '@expo/vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AddToCart from "./AddToCartPage";
import LunchMeals from "./Lunch";
import BreakFast from "./BreakFast";
import Sides from "./sides";
import SweetTreats from "./sweetTreats";


const Tab = createBottomTabNavigator();
function HomeUser({navigation}){

    const [menuItems, setMenuItems] = useState([]);
    const [isAddItem,setIsAddItem] = useState('meals')
    const [filterData, setFilterData] = useState([]);
    const [mealIsSelected, SetIsSelectedMeal] = useState(false)
    const [lunchIsSelected, SetIsSelectedLunch] = useState(false)
    const [breakFasIsSelected, SetIsSelectedBreakFast] = useState(false)
    const [sidesIsSelected, SetIsSelectedSides] = useState(false)
    const [treatsIsSelected, SetIsSelectedTreats] = useState(false)


   
    console.log('number of items',menuItems.length)
    //const totalItems = menuItems.length
    

     useEffect(()=>{
      SetIsSelectedMeal(!mealIsSelected)
           const getData = async ()=>{
              let data= await getDocs(collection(db, "restaurant"))
              setMenuItems(
                 data.docs.map((doc)=>(
                    doc.data()
                 ))
              )
           }
           getData()
      },[])
    console.log('menu', menuItems)
  

    return(
        <View style={styles.Container}>
           
             <View style={styles.Inner}>  
             </View>
             <View style={{width: '100%', height: 230, backgroundColor: 'white'}}>
             <Image source={img} style={{width: '100%', height: '100%'}} />
             <Pressable onPress={()=>navigation.navigate('Cart')} style={[{position:'absolute',zIndex:99},styles.cart]}>
              <Ionicons name="cart" size={24} color='orange'/>
             </Pressable>
             <Pressable onPress={()=>navigation.navigate('Profile')}>
                <View style={{width: 50, height: 50, backgroundColor: 'orange', position: 'absolute', marginVertical: -280, marginHorizontal: 10, borderRadius: 150}}>
                <Ionicons name="person" size={24} color='#fff' style={{alignSelf: 'center', marginTop: 10}}/>
                </View>    
             </Pressable>
            
             </View>
       
             <View style={styles.texts}>

             <ScrollView horizontal={true}>
                 <Pressable onPress={() => {setIsAddItem('meals'); {SetIsSelectedMeal(!mealIsSelected);{SetIsSelectedLunch(false)};{SetIsSelectedBreakFast(false)}}}}>
                      <Text  style={ mealIsSelected ?  styles.mealsM : styles.mealsm}>Meals</Text>
                    </Pressable>
                    <Pressable onPress={() =>{setIsAddItem('lunch'); {
                      SetIsSelectedLunch(!lunchIsSelected);
                     {SetIsSelectedMeal(false)};{SetIsSelectedBreakFast(false)}}}  }>
                      <Text  style={ lunchIsSelected ?  styles.lunchM : styles.lunchm}>Lunch Meals</Text>
                    </Pressable>
                    <Pressable onPress={() =>{setIsAddItem('break fast'); {SetIsSelectedBreakFast(!breakFasIsSelected);{SetIsSelectedMeal(false)};{SetIsSelectedLunch(false)}}}  }>
                      <Text style={ breakFasIsSelected ?  styles.breakM : styles.breakm}>Break Fast Meals</Text>
                    </Pressable>
                  <Pressable onPress={() => {setIsAddItem('sides');{SetIsSelectedSides(!sidesIsSelected);{SetIsSelectedMeal(false)};{SetIsSelectedLunch(false)};{SetIsSelectedBreakFast(false)}}}}>
                      <Text  style={ sidesIsSelected ?  styles.sideM : styles.sidem}>Sides</Text>
                    </Pressable>
                    <Pressable onPress={() => {setIsAddItem('sweet treats');{SetIsSelectedTreats(!treatsIsSelected);{SetIsSelectedMeal(false)};{SetIsSelectedLunch(false)};{SetIsSelectedBreakFast(false)};{SetIsSelectedSides(false)}}}}>
                      <Text  style={ treatsIsSelected ?  styles.treatsM : styles.treatsm}>Sweet Treats</Text>
                    </Pressable>   
                    
      
                  </ScrollView>
            </View>
        

            <View style={styles.menu}>
              {isAddItem==='meals'?
                    <FlatGrid
                                   itemDimension={130}
                                    data={menuItems}
                                    style={styles.gridView}
                                    // staticDimension={300}
                                    // fixed
                                    spacing={10}
                                    renderItem={({ item }) => (
                                      <Pressable onPress={()=>navigation.navigate('addToCart',{
                                        itemName: item.name,
                                        itemPic: item.image,
                                        itemAmount: item.amount
                                          })} style={[styles.itemContainer]}>
                                      <View style={{backgroundColor:'yellow', height:100,borderRadius: 15}}>
                                        <Image style={{height:'100%', width:'100%',borderRadius: 15,}}  source={{uri: item.image}}/>   
                                      </View>
                                      <View style={{ height:60, bottom:0, position:"absolute", width:'90%'}}>
                                      <Text style={styles.itemName}>{item.name}</Text>
                                      <Text style={styles.itemName}>R{item.amount}</Text>
                                      </View>
                                    
                                  </Pressable>
                                    )}
                    />:isAddItem==='lunch'?<LunchMeals navigation={navigation} test={menuItems} />:isAddItem==='break fast'?<BreakFast navigation={navigation} test={menuItems} />:isAddItem==='sides'? <Sides navigation={navigation} test={menuItems}/>: <SweetTreats navigation={navigation} test={menuItems}/>
               }
            </View>
           
        </View>
    )
}
export default HomeUser;
const styles = StyleSheet.create({
  lunchm:{
   color:'white',
   marginHorizontal: 12 
  },
  lunchM:{
     color: 'orange',
     marginHorizontal: 12 
  },
  breakM:{
    color: 'orange',
    marginHorizontal: 12
  },
  sideM:{
     color: 'orange',
     marginHorizontal: 12
  },
  treatsM:{
    color: 'orange',
    marginHorizontal: 12
  },
  treatsm:{
    color: 'white',
    marginHorizontal: 12
  },
  sidem:{
     color: 'white',
     marginHorizontal: 12
  },
  breakm:{
    color: 'white',
    marginHorizontal: 12
  },
  mealsM:{
    color: 'orange',
   
  },
  mealsm: {
   color:'white'
  },
   Container: {
      backgroundColor: 'black',
      height: '100%'
   },
   Inner: {
     width: '100%',
     height: 100,
     display: "flex",
     flexDirection: 'row',
   },
   texts: {
     width: '100%',
     height: 80,
     alignSelf: 'center',
     display: 'flex',
     flexDirection: 'row',
     padding: 10,
   },
   menu: {
      width: '100%',
      height:'100vh',
      backgroundColor: 'black'
   },
   gridView: {
    marginTop: 5,
    flex: 1,
  },
  itemContainer: {

    borderRadius: 15,
   
    height:160,
   
    // backgroundColor:'#e3ddd0'
  },
  itemName: {
    fontSize: 12,
    color: 'white',
    fontWeight: '300',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: 'black',
  },
cart:{
  padding:10,
  borderRadius:100,
  borderWidth:1,
  borderColor:'#fff',
  right:10,
  top:-45
}
   
})
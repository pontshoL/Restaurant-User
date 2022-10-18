import React,{useEffect, useState} from "react";
import {Pressable, StyleSheet, Text, View, Image, TextInput} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from './firebase/config.js'
import logo from './assets/logo.png'
import Register from "./Register";
import HomeUser from "./HomeUser";
import BreakFast from "./BreakFast.js";
import LunchMeals from "./Lunch.js";
import Sides from "./Sides.js";
import SweetTreats from "./SweetTreats.js";
import AddToCart from "./AddToCartPage.js";
import Cart from "./Cart.js";
import Profile from "./profile.js";


const Stack = createNativeStackNavigator();

const Home = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
 

  const login = () => {
     signInWithEmailAndPassword(auth, email, password).then(()=>{
        alert('signed in successfully');
        navigation.navigate('UserHome')
     }).catch((error)=>{
         console.log(error);
     })
  }

  
  return(
    <View style={styles.main}>
    <View style={{width:'100%', height:350, alignSelf: 'center'}}>
        <Image source={logo} style={{width: '100%', height: '100%', alignSelf: 'center'}}/>
        
        
    </View>
    <Text style={{color: 'white', alignSelf: 'center', marginTop:10, fontSize: 20}}>Login</Text>
    <View style={styles.email}>
        <TextInput style={styles.mail} onChangeText={(text)=>setEmail(text)} value={email} placeholder={'Email'}>
           
        </TextInput>

    </View>
    <View style={styles.password}>
        <TextInput secureTextEntry={true} style={styles.mail} onChangeText={(text)=>setPassword(text)} value={password} placeholder={'Password'}>
        </TextInput>
    </View>
    <View style={styles.log}>
        <Pressable onPress={login}>
        <Text style={styles.login}>
            Log In
        </Text>
        </Pressable>
        <Pressable  onPress={()=>navigation.navigate('Register')}>
          <Text style={{color: 'white', marginTop: 15, width: 300}}>Dont have an Account? signUp</Text>
        </Pressable>
        
    </View>
   
</View>     
  )
}
export default function App(){
  const [data,setData] = useState([])
   return(
    <>
      <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen name="UserHome" component={HomeUser} options={{headerShown:false,headerStyle: {backgroundColor: '#F5B81B'}}}/>
          <Stack.Screen name="Home" component={Home} options={{headerShown:false}} />
          <Stack.Screen name="Register" component={Register} options={{headerShown:false}} />
         
           <Stack.Screen name="BreakFast" component={BreakFast} options={{headerShown:false, headerStyle: {backgroundColor: '#F5B81B'}}}/>
          <Stack.Screen name="Lunch" component={LunchMeals} options={{headerShown:false, headerStyle: {backgroundColor: '#F5B81B'}}}/>
          <Stack.Screen name="Side" component={Sides} options={{headerShown:false, headerStyle: {backgroundColor: '#F5B81B'}}}/>
          <Stack.Screen name="Sweet" component={SweetTreats} options={{headerShown:false, headerStyle: {backgroundColor: '#F5B81B'}}}/>
          <Stack.Screen name="Profile" component={Profile} options={{headerShown:false, headerStyle: {backgroundColor: '#F5B81B'}}}/>
          <Stack.Screen name="addToCart" options={{headerShown:false, headerStyle: {backgroundColor: '#F5B81B'}}}>
            
            {
              ({navigation,route})=>{
                return <AddToCart route={route} data={data} navigation={navigation} setData={setData}/>
              }
            }
          </Stack.Screen>
          <Stack.Screen name="Cart" options={{headerShown:false, headerStyle: {backgroundColor: '#F5B81B'}}}>
            {
              ({navigation,route})=>{
                return <Cart route={route} setData={setData} data={data} navigation={navigation}/>
              }
            }
          </Stack.Screen>




        </Stack.Navigator>
      </NavigationContainer>
    </>
   
   )
}
const styles = StyleSheet.create({
  main: {
    backgroundColor: "black",
    height: '100%'
 },
 
 password: {
     border: "2px solid black",
     width: 300,
     height:60,
     alignSelf: "center",
     marginTop:6,
     borderRadius: 11,
     top: '10%'
 },
 email: {
     border: "2px solid black",
     width: 300,
     height:60,
     alignSelf: "center",
     marginTop:15,
     borderRadius: 11,
     top: '10%',
     
 },
 log:{
     backgroundColor: "#F5B81B",
     border: "2px solid black",
     width: 200,
     height:50,
     alignSelf: "center",
     marginTop:30,
     borderRadius: 11,
     top: '12%'
 },
 mail: {
     color: "white",
     marginLeft: 15,
     marginTop: 10,
     width: 250,
     height: 50,
     backgroundColor: "#F5B81B",
     borderRadius: 12,
 },
 login:{
     color: "white",
     marginLeft: 15,
     marginTop: 10,
     alignSelf: "center"
 }
 
});



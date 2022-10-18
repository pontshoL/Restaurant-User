import React, { useState } from "react";
import { Text, View, StyleSheet, Image, Pressable,TextInput } from "react-native";
import {addDoc, collection} from 'firebase/firestore'
import logo from './assets/logo.png';
import {createUserWithEmailAndPassword} from 'firebase/auth'
import {auth, db} from './firebase/config';


function Register ({navigation}){
    const [name, setName] = useState('');
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

     
    const register = () => {
        createUserWithEmailAndPassword(auth, email, password).then((userInfo)=>{
            const collectionRef = collection(db, "Users")
            const UserID = userInfo.user.uid
            console.log(UserID)
            const user = {
                userID: UserID,
                name: name,
                surname: surname
            }
            alert('signed up successfully')
            navigation.navigate('Home')
            addDoc(collectionRef, user)
        }).catch((error)=>{
            console.log(error)
        })
    }
    return(
        <View style={styles.main}>
        <View style={{width:'100%', height:350, alignSelf: 'center'}}>
        <Image source={logo} style={{width: '100%', height: '100%', alignSelf: 'center'}}/>
    </View>
        <Text style={{color: 'white', alignSelf: 'center', marginTop:10, fontSize: 20}}>Admin Sign Up</Text>
        <View style={styles.email}>
        <TextInput style={styles.mail} onChangeText={(text)=>setName(text)} value={name} placeholder={'Name'}></TextInput>
        </View>
        <View style={styles.email}>
        <TextInput style={styles.mail}  onChangeText={(text)=>setSurname(text)} value={surname} placeholder={'Surname'}></TextInput>
        </View>
        <View style={styles.email}>
        <TextInput style={styles.mail}  onChangeText={(text)=>setEmail(text)} value={email} placeholder={'Email'}></TextInput>
        </View> 
        <View style={styles.email}>
        <TextInput secureTextEntry={true} style={styles.mail}  onChangeText={(text)=>setPassword(text)} value={password}  placeholder={'Password'}></TextInput>
        </View>
        
        <View style={styles.log}>
            <Pressable onPress={register}>
            <Text style={styles.login}>
                Sign Up
            </Text>
            </Pressable>
            <Pressable  onPress={() => navigation.navigate('Home')}>
              <Text style={{color: 'white', marginTop: 20, width: 300}}>Already have an Account? signIn</Text>
           </Pressable>
            
        </View>
    </View>
    )
   
}
export default Register;

const styles = StyleSheet.create({
    main: {
       backgroundColor: "black",
       height: '100%'
    },
    email: {
        border: "2px solid black",
        width: 300,
        height:20,
        alignSelf: "center",
        marginTop:15,
        borderRadius: 20,
        margin: 20
    },
    log:{
        backgroundColor: "#F5B81B",
        border: "2px solid black",
        width: 220,
        height:50,
        alignSelf: "center",
        marginTop:12,
        borderRadius: 20,
        top: '5%'
    },
    mail: {
        backgroundColor: "#F5B81B",
        color: "white",
        marginLeft: 10,
        marginTop: 10,
        width: 300,
        height: 50,
        borderRadius: 12,
    },
    login:{
        color: "white",
        marginLeft: 15,
        marginTop: 10,
        alignSelf: "center",
      
    }
    
})
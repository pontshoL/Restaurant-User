import {  View, StyleSheet, Pressabl, Text, Pressable , Image} from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from 'firebase/firestore';
import {auth, db} from './firebase/config'
import {  signOut } from "firebase/auth";
import * as ImagePicker from 'expo-image-picker';
import back from './assets/arrow.png'
import { AntDesign } from '@expo/vector-icons';



const image = "https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png"

function Profile ({navigation}){
    const [userData,setUserData] = useState({});
    const [userEmail,setEmail] =  useState('');
    const [selectedImage, setSelectedImage] = useState(null);


     const gallery = () =>{
          console.log('need you')
     }
    const openImagePickerAsync = async () => {
        console.log('Horny')
        let pickerResult = await ImagePicker.launchImageLibraryAsync();
        if (pickerResult.cancelled === true) {
          return;
        }
        setSelectedImage(pickerResult.uri );


        
      };
    
    

    const getProfile = async() =>{
        const user = auth.currentUser;
        const UserID = user.uid;
        console.log(user)
        console.log(UserID)
        console.log(UserID)
        const email = user.email;
        setEmail(email)

        const collectionRef = collection(db, 'Users')
        const myData = query(collectionRef, where('userID', '==', UserID))
        const data = await getDocs(myData)

        data.forEach((doc)=>{
            console.log("user details: ", doc.data());
            setUserData(doc.data());
            console.log(doc.data());
        })
     }
     useEffect(()=>{
          getProfile()
     },[])

     function Logout(){
        signOut(auth).then(()=>{
            console.log('sign-out successfully')
            navigation.navigate('Home')
        }).catch((error) =>{
            console.log('something went wrong')

        })
     }
    return(
        <View style={styles.container}>
             <View style={styles.inner}>
             
             <Pressable onPress={()=> navigation.navigate('UserHome')}>
                      <AntDesign name="leftcircle" size={24} color="orange" style={{marginTop:10, marginLeft: 10}}/>
                    </Pressable>
                  <View style={styles.pic}>
                    {
                        selectedImage ?  <Image source={{uri:selectedImage}} style={styles.Image} resizeMode='cover' /> :<Image source={{uri:image}} style={styles.Image} resizeMode='cover' />
                    }
                    
                  
                     <Ionicons onPress={openImagePickerAsync} name="camera" size={24} style={styles.selectImage}/>
                
                  </View>
                  <Text style={{color: 'white',alignSelf: 'center', marginTop: 5,fontSize: 18}}>{userData.name}'s Profile</Text>
             </View>
              <Text style={{color: 'white', marginTop: '10%', marginLeft: 20, fontSize:18}}>Details</Text>
              <View style={{marginTop: 10, marginLeft: 20}}>
                  <Text style={{color: 'white', marginBottom: 15, fontSize:18}}>Name: {userData.name}</Text>
                  <Text style={{color: 'white', marginBottom: 15, fontSize:18}}>Surname: {userData.surname}</Text>
                  <Text style={{color: 'white', fontSize:18}}>Email: {userEmail}</Text>

              </View>
              
              <Pressable onPress={()=>Logout()}>
              <View style={{marginTop: 250, marginLeft: 20, height:50, width:50, backgroundColor: 'orange', borderRadius:150}}>
                <Ionicons name="log-out" size={24} color='black' style={{alignSelf: 'center', marginTop: 10}}/>
              </View>
              </Pressable>
              
                <Text style={{color: 'white', marginLeft: 20}}>Logout</Text>
              
        </View>
    )

}
export default Profile;
const styles = StyleSheet.create({
    Image:{
     width:200,
     height:200, 
     borderRadius:150,
    },
    selectImage:{
       position:"absolute",
       right:0,
       bottom:0,
       marginRight:25
    },
    container: {
        height: '100%',
        backgroundColor: 'orange'
    },
    inner: {
        height: '35%',
        backgroundColor: 'black',
        borderBottomLeftRadius: 70,
        borderBottomRightRadius: 70, 
    },
    pic: {
        width: 200,
        height: 200,
        backgroundColor: 'black',
        borderRadius: 150,
        alignSelf: 'center',
        marginTop: '10%'        
    }
})





























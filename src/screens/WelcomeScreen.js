import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import {useNavigation} from '@react-navigation/native'

import * as Progress from 'react-native-progress';
const value=1;
const WelcomeScreen = () => {

    const navigation=useNavigation()
    const [progress, setProgress] = useState(0);
    const [indeterminate, setIndeterminate] = useState(true);
    
    useEffect(() => {
      let interval;
      const timer = setTimeout(() => {
        setIndeterminate(false);
        interval = setInterval(() => {
          setProgress((prevProgress) =>
            Math.min(1, prevProgress + Math.random() / 5)
          );
        }, 500);
      }, 1500)
      if (progress>=1){

        navigation.navigate('Login')
      }
      return () => {
        clearTimeout(timer);
        clearInterval(interval);
      };
    }, [progress]);


  return (
    <View style={styles.container}>
        <View style={{height:'7%', backgroundColor:"#079DDF"}}>
                   
        </View>
        <View style={{height:"95%", justifyContent:"center", alignItems:"center"}}>
            <Text style={{textAlign:"center", lineHeight:50, fontSize:35,fontWeight:'700', letterSpacing:2, marginBottom:10}}>
                {"Welcome \n to \nScientific Lab"}
            </Text>
            <Progress.Bar progress={progress} width={250} height={10} animated={true} animationType='timing' indeterminate={indeterminate} color='#079DDF'
            
            
            />
            <Image source={require('../../assets/logo.png')} style={{top:20}} width={30} height={30} />
        </View>
    </View>
  )
}

export default WelcomeScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#FBFCF7"
    }
})
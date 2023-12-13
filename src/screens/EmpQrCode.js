import {
  Image,
  ImageBackground,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
import Checkbox from "expo-checkbox";
import * as ImagePicker from 'expo-image-picker';


const EmpQrCode = () => {
  const data = useSelector((state) => state.employees);
  const [isChecked, setIsChecked] = useState(false);
  //   console.log(data.employeeLogin[0].name);
  const dispatch = useDispatch();
  
  const navigation = useNavigation();
  const route = useRoute();
  const { qrData } = route.params;
  const { imageData } = route.params;
  
  const [image, setImage] = useState(imageData?imageData:null);
  console.log("qr routes", qrData);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleYesPress = () => {
    setIsChecked(true);
  };

  const handleNoPress = () => {
    setIsChecked(false);
  };


  return (
    <View style={{ flex: 1, backgroundColor: '#002F65', }}>
      <View style={{ backgroundColor: '#079DDF', padding: 10 }}>
        <Text style={{ fontSize: 25, color: '#fff' }}>Hello, </Text>
      </View>
      <Text style={styles.buttonText}>Scan The Qr Code</Text>
      <ScrollView
        style={{ flex: 1, padding: 10 }}
        onStartShouldSetResponder={() => Keyboard.dismiss()}
      >
        <View style={{ marginVertical: 5,  }}>
          <Text style={{ fontSize: 20, color: '#fff', textAlign: 'center' }}>
            EXHIBIT WORKS?
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            //   marginVertical: 10,
            }}
          >
            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center' }}
              onPress={handleYesPress}
            >
              <Checkbox
                style={{ margin: 5, backgroundColor: 'white', borderColor: 'blue', borderRadius: 100 }}
                value={isChecked}
              />
              <Text style={{ fontSize: 15, color: 'white', textAlign: 'center' }}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center' }}
              onPress={handleNoPress}
            >
              <Checkbox
                style={{ margin: 5, backgroundColor: 'white', borderColor: 'blue', borderRadius: 100 }}
                value={!isChecked}
              />
              <Text style={{ fontSize: 20, color: 'white', textAlign: 'center' }}>No</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ backgroundColor: '#355274', marginVertical: 10, padding: 10, borderRadius: 10,  }}>
          <Text style={{ color: 'white', fontSize: 20, marginBottom: 10, }}>REPORT ISSUES</Text>
          <TextInput
            placeholder="Type Here"
            style={{
              backgroundColor: '#355274',
              width: '100%',
              height: 100,
            //   padding: 10,
              color: '#fff',
            //   borderRadius: 5,
            textAlignVertical:"top"
            }}
            multiline
            placeholderTextColor="white"
          />
        </View>

        <View style={{ backgroundColor: '#fff', marginVertical: 10, padding: 10, borderRadius: 10, }}>
          <Text style={{ color: '#355274', fontSize: 20, marginBottom: 10 }}>DROP A PHOTO</Text>
          {/* <View style={{width:"100%", height:"100%", backgroundColor:"white"}}> */}
            <TouchableOpacity onPress={()=>pickImage()}> 

                <Image source={image?{uri:image}:require('.././assets/images/drop.png')} style={{width: "100%", height: 120,alignSelf:"center", resizeMode:'cover'}}/>
            </TouchableOpacity>
          {/* </View> */}
        </View>
        <View style={{ marginVertical:10,margin:10 }}>
            <TouchableOpacity style={{margin:5,backgroundColor:"#355274"}}>
                <Text style={{color:"white", fontSize:20, textAlign:"center", padding:10}}>SAVE</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{margin:5,backgroundColor:"#355274"}} onPress={()=>navigation.navigate('EmpCamera')}>
                <Text style={{color:"white", fontSize:20, textAlign:"center", padding:10}}>SCAN AGAIN</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{margin:5,backgroundColor:"#355274"}} onPress={()=>navigation.navigate('EmpHomeScreen')}>
                <Text style={{color:"white", fontSize:20, textAlign:"center", padding:10}}>EXIT</Text>
            </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};
export default EmpQrCode;

const styles = StyleSheet.create({
  button: {
    height: "28%",
    backgroundColor: "#002F65",
    width: "60%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    margin: 10 // Adjust the margin based on your preference
  },
  buttonText: {
    color: "white",
    top: 6,
    fontWeight: "500",
    letterSpacing: 2,
    fontSize: 20
  }
});

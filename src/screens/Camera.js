import {
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
  } from "react-native";
  import React from "react";
  import Icon from "react-native-vector-icons/FontAwesome";
  // import camera from '../assets/images'
  // import camera from '../assets/images'
  
  const Camera = () => {
    return (
      <View
        style={{
          height: "100%",
          alignItems: "center",
          backgroundColor: "#002F65"
        }}
      >
        <View
          style={{
            height: "8%",
            width: "100%",
            backgroundColor: "#079DDF",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            paddingLeft: 10
            // paddingRight: 10
          }}
        >
          <Text style={{ fontSize: 25 }}>Hello, Jhon Doe</Text>
          {/* <TouchableOpacity>
              <Icon name="user" size={40} color={"white"} />
            </TouchableOpacity> */}
        </View>
  
        <View style={{ alignItems: "flex-start", width: "100%",paddingLeft:15, paddingTop:15 }}>
          <Text style={{ fontSize: 25, color: "white",fontWeight:'500' }}>Camera</Text>
        </View>
  
        
      </View>
    );
  };
  
  export default Camera;
  
  const styles = StyleSheet.create({
    button: {
      // height: "20%",
      backgroundColor: "#002F65",
      width: "40%",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 10,
      margin: 10 // Adjust the margin based on your preference
    },
    buttonText: {
      color: "white",
      top: 6,
      fontWeight: "500",
      letterSpacing: 2
    }
  });
  
/*


db ka kam hy isma login ky sath

*/ 














import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";

const TextInputField = ({ text,placeholder }) => {
  


  return (
    <View style={{ alignItems: "center", marginTop:10  }}>
      <Text
        style={{ fontSize: 20, fontWeight: "300", color: "#fff", width: 270,marginBottom:5}}
      >
        {text}
      </Text>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={"white"}
        style={{
          height:50,
          width: 270,
          backgroundColor: "#375474",
          color: "white",
          paddingHorizontal: 15,
          fontSize: 15,
          borderRadius:10
        }}
      />
    </View>
  );
};

export default TextInputField;

const styles = StyleSheet.create({});

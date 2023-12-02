import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Platform,
  StatusBar,
  TouchableOpacity
} from "react-native";
import React, { useEffect, useState } from "react";
import TextInputField from "../components/TextInputField";
import {useNavigation} from '@react-navigation/native'

const LoginScreen = () => {
  const navigation=useNavigation()
  const [employeesData, setEmployeesData] = useState(null);

  const IsLogged = () => {
    navigation.navigate('HomeScreen')
  }

  return (
    <View style={{ height: "100%",backgroundColor:"#00073D" }}>
      <View style={{}}>
        <Image
          source={require("../../assets/Login.png")}
          style={{
            width: 400,
            height: 250,
            resizeMode: "contain",
            alignSelf: "center"
          }}
          // resizeMode="cover"
        />
      </View>
      <ScrollView style={{ marginTop: 10 }}>
        <TextInputField text={"Name"} placeholder="Enter Your Name" />
        <TextInputField text={"Password"} placeholder="Enter Your Password" />
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <TouchableOpacity
            style={{ width: 270 }}
            onPress={() => {
              IsLogged();
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 20,
                fontWeight: "700",
                color: "#fff",
                backgroundColor: "#079DDF",
                padding: 10,
                borderRadius: 10
              }}
            >
              Login
            </Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text
              style={{
                textAlign: "center",
                fontSize: 18,
                fontWeight: "400",
                color: "#fff",
                // backgroundColor: "#375474",
                // padding: 10,
                // borderRadius: 10,
                marginTop: 10
              }}
            >
              Forget Password?
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              textAlign: "center",
              fontSize: 18,
              fontWeight: "400",
              color: "#fff",
              // backgroundColor: "#375474",
              // padding: 10,
              // borderRadius: 10,
              marginTop: 10
            }}
          >
            SignUp!
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});

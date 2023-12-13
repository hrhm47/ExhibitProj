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
import { useNavigation } from "@react-navigation/native";
import * as SQLite from "expo-sqlite";
import { useSelector, useDispatch } from "react-redux";

import employeeActions from "../app/action/action";

// import { openDatabase,SQLiteDatabase } from "expo-sqlite";

// import { initDatabase,executeQuery } from "../app/database/DataBaseHelper";

const LoginScreen = () => {
  // const data=useSelector(state=>state?.employees);
  const navigation = useNavigation();
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [employeesData, setEmployeesData] = useState(null);
  // const db = SQLite.openDatabase("newMain1.db");
  const [db, setDb] = useState(SQLite.openDatabase("example.db"));

  const data = useSelector((state) => state.employees);
  const dispatch = useDispatch();
  // console.log("data", data);

  const IsLogged = () => {
    if (data.userInputEmail == null || data.userInputPassword == null) {
      alert("Please Enter Email and Password");
    } else {
      // db.transaction((tx) => {
      //   tx.executeSql(
      //     "INSERT INTO EMPLOYEES (name, date_of_birth, gender, email, phone, address, job_title, role, username, password, hire_date, manager_id) values (?, ?, ?, ?,?,?,?,?,?,?,?,?)",
      //     [
      //       "Khalel Khaleef",
      //       "12/11/1977",
      //       "male",
      //       "khalel@gmail.com",
      //       "03120009998",
      //       "Qatar",
      //       "enginner",
      //       "manager",
      //       "khalel",
      //       "123456",
      //       "12/11/2020",
      //       1
      //     ],
      //     ["khan waqar","12/09/1987","male","khanwaqar@gmail.com","03125634567","pindi","clerk","employee","khanWaqar","123456","12/09/2020",1],
      //     (_, result) => {
      //       console.log("Inserting Result:", result);
      //     },
      //     (_, error) => {
      //       console.error("Error executing insert query:", error);
      //     }
      //   );
      // });

      // db.transaction((tx) => {
      //   tx.executeSql(
      //     "SELECT * FROM EMPLOYEES;",
      //     [],
      //     (_, result) => {
      //       console.log("Selecting Result:", result.rows._array);
      //       // setEmployeesData(result.rows._array)
      //       // navigation.navigate("HomeScreen")
      //     },
      //     (_, error) => {
      //       console.error('Error executing select query:', error);
      //     }
      //   );
      // });

      //   const email = "saleem@gmail.com";
      // const password = "123456";
      // console.log("userEmail", data.userInputEmail);
      // console.log("userPassword", data.userInputPassword);

      if (data.userInputEmail.toLowerCase() == "admin" && data.userInputPassword == "admin") {
        dispatch(employeeActions.setEmployeeLogin(null));
        navigation.navigate("HomeScreen");
      } else {
        db.transaction((tx) => {
          tx.executeSql(
            "SELECT * FROM EMPLOYEES WHERE email = ? AND password = ?;",
            [data.userInputEmail.toLowerCase(), data.userInputPassword],
            (_, result) => {
              if (result.rows.length > 0) {
                console.log("Selecting Result:", result.rows._array[0].name);
                dispatch(employeeActions.setEmployeeLogin(result.rows._array));
                if (result.rows._array[0].role === "manager") {
                  navigation.navigate("HomeScreen");
                }
                else {
                  navigation.navigate("EmpHomeScreen");
                }
              } else {
                alert("Invalid Email or Password");
              }
            },
            (_, error) => {
              console.error("Error executing select query:", error);
            }
          );
        });
      }
    }
  };

  return (
    <View style={{ height: "100%", backgroundColor: "#00073D" }}>
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
        <TextInputField
          text={"Email"}
          placeholder="Enter Your Email"
          identifier="nameField"
          setUserEmail={setUserEmail}
        />
        <TextInputField
          text={"Password"}
          placeholder="Enter Your Password"
          identifier="passwordField"
          setUserPassword={setUserPassword}
        />
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
        </View>
      </ScrollView>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});

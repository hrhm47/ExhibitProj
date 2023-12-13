import {
  Image,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import DailyShiftsComponents from "../components/DailyShiftsComponents";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import TextInputField from "../components/TextInputField";
import * as Sqlite from "expo-sqlite";

const AdminSettings = () => {
  const [empEditName, setEmpEditName] = useState("");
  const [empEditEmail, setEmpEditEmail] = useState("");
  const [empEditUserName, setEmpEditUserName] = useState("");
  const [empEditPassword, setEmpEditPassword] = useState("");

  const data = useSelector((state) => state?.employees);
  const navigation = useNavigation();

  const db = Sqlite.openDatabase("example.db");

  const updateEmployee = () => {
    if (
      empEditName === "" ||
      empEditEmail === "" ||
      empEditUserName === "" ||
      empEditPassword === ""
    ) {
      return alert("Please Login Fist");
    } else {
      if (data?.employeeLogin == null) {
        return alert("Please login first");
      } else {
        db.transaction((tx) => {
          tx.executeSql(
            `UPDATE EMPLOYEES
         SET
           name = ?,
           email = ?,
           username = ?,
           password = ?
         WHERE employee_id = ?`,
            [
              empEditName,
              empEditEmail,
              empEditUserName,
              empEditPassword,
              data?.employeeLogin? data?.employeeLogin[0]?.employee_id:0
              // Specify the employee_id for the WHERE clause
            ],
            (_, result) => {
              console.log("Employee updated successfully:", result);
              alert(
                "Profile Updated",
                "Your Profile has been updated successfully",
                [
                  {
                    text: "Ok",
                    onPress: () => {
                      navigation.navigate("HomeScreen");
                    }
                  }
                ]
              );
            },
            (_, error) => {
              console.error("Error updating employee:", error);
            }
          );
        });
      }
    }
  };

  return (
    <View
      style={{
        height: "100%",
        alignItems: "center",
        backgroundColor: "#002F65"
      }}
    >
      <View style={styles.headerView}>
        <Text style={{ fontSize: 25 }}>
          Hello, 
          {data?.employeeLogin ? data?.employeeLogin[0]?.name : " admin"}
        </Text>
      </View>

      <View style={styles.tagView}>
        <Text style={styles.textStyle((font = 20))}>Settings</Text>
      </View>

      <View
        style={{
          backgroundColor: "#079DDF",
          height: "80%",
          width: "90%",
          padding: 10,
          margin: 10,
          borderRadius: 10,
          borderBottomColor: "#000"
          // borderEndWidth: 2
        }}
      >
        <ScrollView>
          <View
            style={{
              // backgroundColor: "#1c1c1c",
              height: "14%",
              padding: 10,
              borderRadius: 10
            }}
          >
            {/* <Text style={{ fontSize: 25 }}>Hello,
        {data?.employeeLogin[0]?.name}
        </Text> */}
            <Icon name="user" size={60} color="#fff" />
          </View>
          <View
            style={{
              backgroundColor: "#2c2c2c",
              height: "40%",
              // marginTop: "4%",
              padding: 10,
              borderRadius: 10
            }}
          >
            <TextInputField
              text={"Employee Name"}
              placeholder={
                data.employeeLogin!=null? 
                `${
                data?.employeeLogin[0]?.name  
              }`:
              "aadmin"
            }
              identifier={"EmployeeEditName"}
              margin={0}
              setEmpEditName={setEmpEditName}
              identifierLabel={
                empEditName ? empEditName : 
                    data?.employeeLogin
                  ?
                    data?.employeeLogin[0]?.name
                  :
                    'admin'
              }
              // changeHandler={setEmpEditName}
            />
            <TextInputField
              text={"Employee Email"}
              placeholder={
                data?.employeeLogin!=null?
                `${ 
                  data?.employeeLogin[0]?.email 
              }`
              : "admin"
            
            }
              identifier={"EmployeeEditEmail"}
              margin={0}
              setEmpEditEmail={setEmpEditEmail}
              identifierLabel={
                empEditEmail ? empEditEmail : 
                  data?.employeeLogin
                ? 
                  data?.employeeLogin[0]?.email
                : 
                  "admin email"
              }
            />
          </View>

          <View
            style={{
              backgroundColor: "#1c3c1c",
              height: "40%",
              marginTop: "4%",
              padding: 10,
              borderRadius: 10
            }}
          >
            <TextInputField
              text={"Employee UserName"}
              placeholder={
                  data?.employeeLogin!=null
                ?`
                ${
                data?.employeeLogin[0]?.username 
              }`:
                 "admin"
            }
              identifier={"EmployeeEditUserName"}
              margin={0}
              setEmpEditUserName={setEmpEditUserName}
              identifierLabel={
                empEditUserName!=null
                  ? empEditUserName
                  : data?.employeeLogin[0]
                    ? 
                      data?.employeeLogin[0]?.username
                        :
                        "admin"
              }
            />

            <TextInputField
              text={"Employee Password"}
             placeholder={
              data.employeeLogin!=null
              ?
              `
              ${
              data?.employeeLogin[0]?.password 
            }`
            :
               "admin"
          }
              identifier={"EmployeeEditPassword"}
              margin={0}
              setEmpEditPassword={setEmpEditPassword}
              identifierLabel={
                empEditPassword!=null
                  ? empEditPassword
                  : data?.employeeLogin
                    ?
                      data?.employeeLogin[0]?.password
                        :"admin"
              }
            />

            <TouchableOpacity onPress={() => updateEmployee()}>
              <Text
                style={[
                  styles.empText,
                  {
                    padding: 10,
                    fontSize: 20,
                    backgroundColor: "#1c2",
                    margin: 10,
                    borderRadius: 10,
                    textAlign: "center"
                  }
                ]}
              >
                Edit information
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default AdminSettings;

const styles = StyleSheet.create({
  headerView: {
    height: "8%",
    width: "100%",
    backgroundColor: "#079DDF",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingLeft: 10
  },
  tagView: {
    alignItems: "flex-start",
    width: "100%",
    paddingLeft: 15,
    paddingTop: 15
  },
  selectionView: {
    height: "40%",
    // backgroundColor: "green",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%"
  },
  empShiftsContainer: {
    // backgroundColor: "yellow",
    width: "50%",
    height: "100%",
    alignItems: "center"
  },
  // saveButtonStyle: {
  //   backgroundColor: "#079DDF",
  //   // padding: 10,
  //   // width: "20%",
  //   borderRadius: 10,
  //   alignItems: "center",
  //   justifyContent:"center"
  // }
  // ,
  textStyle: (font) => ({
    color: "white",
    fontSize: font,
    fontWeight: "500",
    letterSpacing: 2
  }),
  empText: {
    color: "white",
    fontSize: 15,
    fontWeight: "500"
  }
});

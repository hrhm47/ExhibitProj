/*


db ka kam hy isma login ky sath

*/

import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import employeeActions from "../app/action/action";

const TextInputField = ({
  text,
  placeholder,
  identifier,
  setEmployeName,
  setEmail,
  setGender,
  setHireDate,
  setPhoneNumber,
  setPassword,
  setJobTitle,
  setUserEmail,
  setUserPassword,
  setStarting_time,
  setEnding_time,
  setAttenPassword,
  margin,
  setEmpEditName,
  setEmpEditEmail,
  setEmpEditUserName,
  setEmpEditPassword,
  setExhibitName,
  setExhibitType,
  setExhibitLocation
}) => {
  // ==========================  for employee section ===================
  // const [employeName, setEmployeName] = useState("");
  // const [gender, setGender] = useState("");
  // const [email, setEmail] = useState("");
  // const [Password, setPassword] = useState("");
  // const [phoneNumber, setPhoneNumber] = useState("");
  // const [jobTitle, setJobTitle] = useState("");
  // const [hireDate, setHireDate] = useState("");

  const data = useSelector((state) => state.employees);
  const dispatch = useDispatch();

  const changeHandler = (text) => {
    switch (identifier) {
      case "nameField": {
        setUserEmail(text);
        dispatch(employeeActions.setUserEmail(text));
        break;
      }

      case "passwordField": {
        setUserPassword(text);
        dispatch(employeeActions.setUserPassword(text));
        break;
      }
      case "Employe_Name": {
        return setEmployeName(text);
      }

      case "Gender": {
        return setGender(text);
      }

      case "Email": {
        return setEmail(text);
      }
      case "Password": {
        return setPassword(text);
      }

      case "Phone_Number": {
        return setPhoneNumber(text);
      }

      case "Job_Title": {
        return setJobTitle(text);
      }
      case "Hire_Date": {
        return setHireDate(text);
      }
      case "StartingTime": {
        return setStarting_time(text);
      }
      case "EndingTime": {
        return setEnding_time(text);
      }
      case "AttendanecPassword": {
        return setAttenPassword(text);
      }
      case 'EmployeeEditName':{
        return setEmpEditName(text);
      }

      case 'EmployeeEditEmail':{
        return setEmpEditEmail(text);
      }

      case 'EmployeeEditUserName':{
        return setEmpEditUserName(text);
      }

      case 'EmployeeEditPassword':{
        return setEmpEditPassword(text);
      }
      case 'exhibitName':{
        return setExhibitName(text);
      }
      case 'exhibitType':{
        return setExhibitType(text);
      }
      case 'exhibitLocation':{
        return setExhibitLocation(text);
      }

      default: {
        return;
      }
    }
  };

  return (
    <View style={{ alignItems:margin==0?null:"center", marginTop:10 }}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "300",
          color: "#fff",
          width: 270,
          marginBottom: 5
        }}
      >
        {text}
      </Text>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={"white"}
        style={{
          height: 50,
          width: 270,
          backgroundColor: "#375474",
          color: "white",
          paddingHorizontal: 15,
          fontSize: 15,
          // borderRadius: 10
        }}
        secureTextEntry={identifier == "passwordField" ? true : false}
        onChangeText={(text) => changeHandler(text)}
      />
    </View>
  );
};

export default TextInputField;

const styles = StyleSheet.create({});

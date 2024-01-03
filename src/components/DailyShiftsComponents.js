import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { Picker } from "@react-native-picker/picker";
const DailyShiftsComponents = ({
  identifier,
  labelText,
  mapData,
  margin,
  height,
  setEmployeName,
  setStartTime,
  setEndTime,
  setEmpId,
  setShitType,
  setLocation,
  setReportIdValue,
  setReportTypeValue,
  setEmpEditName,
  setEmpEditEmail,
  setEmpEditUserName,
  setEmpEditPassword,
  identifierLabel,
  setWeekDay,
  setCloseMe,
  setGender,
  setJobTitle,
  setHireDate,
  setExhibitName,
  setExhibitType,
  setExhibitLocation,
  setPriorityIssues,
  setStatusIssues,
  setIssueDates,
  setExhibitNamesId
}) => {
  const [employeNamee, setEmployeNamee] = useState("");
  // const [startTime, setStartTime] = useState("");
  // const [endTime, setEndTime] = useState("");
  // const [shiftType, setShitType] = useState("");

  const selectPickerValue = (value) => {
    // console.log(employeNamee, "hellllllllo");;
    setEmployeNamee(value);
    switch (identifier) {
      case "EmployeName": {
        // console.log(mapData);
        setEmployeName(value);
        // setEmpId(mapData[value-1]?.label)
        break;
      }

      case "startTime": {
        return setStartTime(mapData[value - 1]?.label);
      }

      case "endTime": {
        return setEndTime(mapData[value - 1]?.label);
      }

      case "shiftType": {
        return setShitType(mapData[value - 1]?.label);
      }

      case "shiftLocation": {
        return setLocation(mapData[value - 1]?.label);
      }
      case "RportType": {
        return setReportTypeValue(value);
      }

      case "EmployeeEditName": {
        return setEmpEditName(value);
      }

      case "EmployeeEditEmail": {
        return setEmpEditEmail(value);
      }

      case "EmployeeEditUserName": {
        return setEmpEditUserName(value);
      }

      case "EmpolyeeEditPassword": {
        return setEmpEditPassword(value);
      }
      case "weekdaysData": {
        return setWeekDay(value);
      }
      case "genderForEmoployee": {
        return setGender(value);
      }
      case "Job_Title": {
        setJobTitle(value);
        return;
      }
      case "Hire_Date": {
        return setHireDate(value);
      }
      case "ExhibitName":{
        return setExhibitName(value);
      }
      case "exhibitType":{
        return setExhibitType(value);
      }
      case "Location":{
        return setExhibitLocation(value);
      }
      case "issueDateinIssues":{
        return setIssueDates(value);
      }
      case "statusInIssues":{
        return setStatusIssues(value);
      }
      case "priorityInIssues":{
        return setPriorityIssues(value);
      }
      case "exhibitDatainIssues":{
        return setExhibitNamesId(value);
      }
      default: {
        return;
      }
    }
  };

  return (
    <View
      style={{
        flexDirection: "column",
        justifyContent: "center",
        width: height == 0 ? "100%" : height == 10 ? 270 : "80%",

        // backgroundColor:"red",
        // height:Platform.OS=="ios"? 10: null,
        margin: !margin ? 10 : margin != 0 ? 0 : 10,
        marginTop: margin == 10 ? margin : 0
      }}
    >
      {labelText && (
        <Text
          style={{
            color: "white",
            paddingBottom: 3,
            fontSize: height == 10 ? 20 : 16,
            fontWeight: height == 10 ? "300" : null
          }}
        >
          {labelText}
        </Text>
      )}
      {mapData ? (
        <Picker
          style={{
            backgroundColor: "#355274",
            // backgroundColor: "red",
            // borderRadius: 20,
            width: "100%",
            color: "white",
            height: 50
          }}
          //   itemStyle={{ color: "white" }}
          collapsable={true}
          testID="basic-picker"
          selectedValue={employeNamee}
          onValueChange={(v) => {
            // console.log(j, "v")
            selectPickerValue(v);
          }}
          // accessibilityLabel="Basic Picker Accessibility Label"

          itemStyle={{ color: "white", fontSize: 15, height: 50 }}
        >
          {mapData?.map((item, index) => (
            <Picker.Item
              // style={{color:"white",}}
              label={item.label ? item.label : item}
              value={item.id ? item.id : index}
              key={index}
            />
          ))}
        </Picker>
      ) : identifierLabel ? (
        <>
          <View style={{ backgroundColor: "#355274" }}>
            <Text style={{ color: "white", padding: 15, fontSize: 16 }}>
              {identifierLabel}
            </Text>
          </View>
        </>
      ) : (
        <>
          <View style={{ backgroundColor: "#355274" }}>
            <Text style={{ color: "white", padding: 15, fontSize: 16 }}>
              {identifier}
            </Text>
          </View>
        </>
      )}
    </View>
  );
};

export default DailyShiftsComponents;

const styles = StyleSheet.create({});

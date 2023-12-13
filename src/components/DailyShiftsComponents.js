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
  identifierLabel
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

      case "EmployeeEditName":{
        return setEmpEditName(value);
      }

      case "EmployeeEditEmail":{
        return setEmpEditEmail(value);
      }

      case "EmployeeEditUserName":{
        return setEmpEditUserName(value);
      }

      case "EmpolyeeEditPassword":{
        return setEmpEditPassword(value);  
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
        width: "80%",
        // height:Platform.OS=="ios"? 10: null,
        margin: margin == 0 ? margin : 10
      }}
    >
      <Text style={{ color: "white", paddingBottom: 3, fontSize: 16 }}>
        {labelText}
      </Text>
      {mapData ? (
        <Picker
          style={{
            backgroundColor: "#355274",
            borderRadius: 20,
            color: "white",
            height: 50,
          }}
          //   itemStyle={{ color: "white" }}

          testID="basic-picker"
          selectedValue={employeNamee}
          onValueChange={(v) => {
            // console.log(j, "v")
            selectPickerValue(v);
          }}
          accessibilityLabel="Basic Picker Accessibility Label"
          itemStyle={{color:"white", fontSize: 15 , height: 50,}}
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
      )
      :
      identifierLabel?
      (
        <>
          <View style={{ backgroundColor: "#355274" }}>
            <Text style={{ color: "white", padding: 15, fontSize: 16 }}>
              {identifierLabel}
            </Text>
          </View>
        </>
      )
            
      : (
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

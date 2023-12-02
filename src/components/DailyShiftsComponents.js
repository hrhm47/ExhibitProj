import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { Picker } from "@react-native-picker/picker";
const DailyShiftsComponents = ({ identifier, labelText, mapData, margin }) => {
  const [employeName, setEmployeName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [shiftType, setShitType] = useState("");
  return (
    <View
      style={{
        flexDirection: "column",
        justifyContent: "center",
        width: "80%",
        margin: margin == 0 ? margin : 10
      }}
    >
      <Text style={{ color: "white", paddingBottom: 3, fontSize: 16 }}>
        {labelText}
      </Text>
      <Picker
        style={{ backgroundColor: "#333", borderRadius: 20, color: "white" }}
        //   itemStyle={{ color: "white" }}

        testID="basic-picker"
        selectedValue={employeName}
        onValueChange={(v) => setEmployeName(v)}
        accessibilityLabel="Basic Picker Accessibility Label"
      >
        {mapData?.map((item, index) => (
          <Picker.Item label={item.label} value={item.id} key={index} />
        ))}
      </Picker>
    </View>
  );
};

export default DailyShiftsComponents;

const styles = StyleSheet.create({});

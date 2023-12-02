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
import { Picker } from "@react-native-picker/picker";
import DailyShiftsComponents from "../components/DailyShiftsComponents";
// import * as Calendar from 'expo-calendar';
import { Calendar, Agenda } from "react-native-calendars";

const nameData = [
  {
    id: 1,
    label: "Science Exhibit"
  },
  {
    id: 2,
    label: "Arts Exhibit"
  },
  {
    id: 3,
    label: "Medical Exhibit"
  }
];

const exhibitTypeData = [
  {
    id: 1,
    label: "Science"
  },
  {
    id: 2,
    label: "Arts"
  },
  {
    id: 3,
    label: "Medical"
  }
];

const exhibitLocData = [
  {
    id: 1,
    label: "Exhibit G"
  },
  {
    id: 2,
    label: "Exhibit E"
  },
  {
    id: 3,
    label: "Exhibit D"
  }
];

const DailyShifts = () => {
  const [employeName, setEmployeName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [shiftType, setShitType] = useState("");
  const [openCalender, setOpenCalender] = useState(false);
  return (
    <View
      style={{
        height: "100%",
        alignItems: "center",
        backgroundColor: "#002F65"
      }}
      onStartShouldSetResponder={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.headerView}>
        <Text style={{ fontSize: 25 }}>Hello, Jhon Doe</Text>
      </View>

      <View style={styles.tagView}>
        <Text style={styles.textStyle((font = 25))}>Exhibit</Text>
      </View>
      <View
        style={styles.selectionView}
        onStartShouldSetResponder={() => {
          Keyboard.dismiss();
        }}
      >
        <View style={styles.empShiftsContainer}>
          {/* EMPLOYE NAME */}
          <DailyShiftsComponents
            identifier="ExhibitName"
            labelText="EXHIBIT ID"
            mapData={nameData}
            margin={0}
          />

          {/* EXHIBIT ID */}
          <DailyShiftsComponents
            identifier="EXHIBIT ID"
            labelText="EXHIBIT ID"
            // mapData={nameData}
            margin={0}
          />

          {/* Shift Type */}
          <DailyShiftsComponents
            identifier="exhibitType"
            labelText="EXHIBIT TYPE"
            mapData={exhibitLocData}
            margin={0}
          />
          <DailyShiftsComponents
            identifier="Location"
            labelText="LOCATION"
            mapData={exhibitLocData}
            margin={0}
          />
        </View>
      </View>

      <View
        style={{
          height: "35%",
          backgroundColor: "#333",
          width: "80%",
          flexDirection: "row",
          marginTop: 5,
          borderRadius: 20,
          padding: 5
        }}
        onStartShouldSetResponder={() => {
          Keyboard.dismiss();
        }}
      >
        <TextInput
          placeholder="Type Here"
          style={{
            backgroundColor: "#333",
            width: "100%",
            height: "70%",
            alignSelf: "flex-start",
            justifyContent: "center",
            textAlignVertical: "top",
            padding: 10,
            color: "#fff",
            flex: 1,
            flexWrap: "wrap"
          }}
          multiline
          scrollEnabled
          placeholderTextColor={"white"}
        />
      </View>
    </View>
  );
};

export default DailyShifts;

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
    height: "45%",
    // backgroundColor: "green",
    // alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    top:"3%"
  },
  empShiftsContainer: {
    // backgroundColor: "yellow",

    width: "90%",
    // height: "70%",
    alignItems: "center"
  },
  textStyle: (font) => ({
    color: "white",
    fontSize: font,
    fontWeight: "500",
    letterSpacing: 2
  })
});

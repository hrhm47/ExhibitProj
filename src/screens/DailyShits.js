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
import DailyShiftsComponents from "../components/DailyShiftsComponents";
// import * as Calendar from 'expo-calendar';
import { Calendar,Agenda } from "react-native-calendars";

const nameData = [
  {
    id: 1,
    label: "Ali"
  },
  {
    id: 2,
    label: "Kabir"
  },
  {
    id: 3,
    label: "Salim"
  }
];

const startTimeData = [
  {
    id: 1,
    label: "8:00"
  },
  {
    id: 2,
    label: "9:00"
  },
  {
    id: 3,
    label: "10:00"
  }
];

const endTimeData = [
  {
    id: 1,
    label: "18:00"
  },
  {
    id: 2,
    label: "19:00"
  },
  {
    id: 3,
    label: "20:00"
  }
];

const shiftTypeData = [
  {
    id: 1,
    label: "Morning"
  },
  {
    id: 2,
    label: "Evening"
  },
  {
    id: 3,
    label: "Night"
  }
];

const shitLocData = [
  {
    id: 1,
    label: "Exhibit A"
  },
  {
    id: 2,
    label: "Exhibit B"
  },
  {
    id: 3,
    label: "Exhibit C"
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
     
    >
      <View style={styles.headerView}>
        <Text style={{ fontSize: 25 }}>Hello, Jhon Doe</Text>
      </View>

      <View style={styles.tagView}>
        <Text style={styles.textStyle((font = 25))}>Daily Shits</Text>
      </View>
      <View style={styles.selectionView}>
        <View style={styles.empShiftsContainer}>
          {/* EMPLOYE NAME */}
          <DailyShiftsComponents
            identifier="EmployeName"
            labelText="EMPLOYEE NAME"
            mapData={nameData}
          />

          {/* START TIME */}
          <DailyShiftsComponents
            identifier="startTime"
            labelText="START TIME"
            mapData={startTimeData}
          />

          {/* Shift Type */}
          <DailyShiftsComponents
            identifier="shiftType"
            labelText="SHIFT TYPE"
            mapData={shiftTypeData}
          />
        </View>

        <View style={styles.empShiftsContainer}>
          {/* EMPLOYE NAME */}
          <DailyShiftsComponents
            identifier="employeeID"
            labelText="EMPLOYEE ID"
            // mapData={nameData}
          />

          {/* START TIME */}
          <DailyShiftsComponents
            identifier="endTime"
            labelText="END TIME"
            mapData={endTimeData}
          />

          {/* Shift Type */}
          <DailyShiftsComponents
            identifier="shiftLocation"
            labelText="SHIFT LOCATION"
            mapData={shitLocData}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.saveButtonStyle}>
        <Text style={styles.textStyle((font = 15))}>SAVE</Text>
      </TouchableOpacity>

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
        
        
      >
        {openCalender ? (
          <>
          <Agenda
          style={{
            // borderWidth: 1,
            // borderColor: 'gray',
            // width:"70%",
            height: "100%",
          }}
          headerStyle={{width:"70%"}}
          
          />
          <View style={{width:"10%"}} onStartShouldSetResponder={()=>setOpenCalender(false)}>
          </View>
            
          </>
        ) : (
          <>
            <View
              style={[
                styles.empShiftsContainer,
                {
                  width: "30%",
                  paddingTop: 10,
                  justifyContent: "space-around",
                  alignItems: "flex-start",
                  paddingLeft: 5
                }
              ]}
            >
              <Text style={styles.empText}>Emp Name</Text>
              <Text style={styles.empText}>Emp ID</Text>
              <Text style={styles.empText}>Start Time</Text>
              <Text style={styles.empText}>End Time</Text>
              <Text style={styles.empText}>Type</Text>
              <Text style={styles.empText}>Location</Text>
            </View>
            <View style={{ borderWidth: 1, borderColor: "white" }}></View>
            <View
              style={[
                styles.empShiftsContainer,
                {
                  width: "40%",
                  paddingTop: 10,
                  justifyContent: "space-around",
                  alignItems: "flex-start",
                  paddingLeft: 5
                }
              ]}
            >
              <Text style={styles.empText}>Mike Jhonson</Text>
              <Text style={styles.empText}>3</Text>
              <Text style={styles.empText}>8:00</Text>
              <Text style={styles.empText}>18:00</Text>
              <Text style={styles.empText}>Morning</Text>
              <Text style={styles.empText}>A</Text>
            </View>
            <View
              style={{
                backgroundColor: "#333",
                width: "30%",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              {/* <Calendar.CalendarType /> */}
              {/* <Calendar
            /> */}
              <TouchableOpacity
                style={{
                  backgroundColor: "#079DDF",
                  alignItems: "center",
                  padding: 8,
                  borderRadius: 10
                }}
                onPress={() => {
                  setOpenCalender((openCalender) => !openCalender);
                }}
              >
                <Icon name="calendar" size={30} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: "#079DDF",
                  alignItems: "center",
                  padding: 8,
                  borderRadius: 10
                }}
              >
                <Text style={styles.empText}>Edit</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
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
  saveButtonStyle: {
    backgroundColor: "#079DDF",
    padding: 10,
    width: "20%",
    borderRadius: 10,
    alignItems: "center"
  },
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

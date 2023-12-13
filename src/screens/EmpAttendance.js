import {
  Alert,
  Image,
  ImageBackground,
  Keyboard,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as Sqlite from "expo-sqlite";

import TextInputField from "../components/TextInputField";

const EmpAttendance = () => {
  const data = useSelector((state) => state.employees);
  const [starting_time, setStarting_time] = useState("");
  const [ending_time, setEnding_time] = useState("");
  const [attenPassword, setAttenPassword] = useState("");

  // console.log(data?.employeeLogin[0]?.employee_id);
  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState(false);
  const db = Sqlite.openDatabase("example.db");

  const submitAttendance = () => {
    console.log("submitAttendance");
    if (starting_time == "" || ending_time == "" || attenPassword == "") {
      Alert.alert(
        "Empty Fields",
        "Please Enter Starting Time, Ending Time and Password",
        [
          {
            text: "OK",
            onPress: () => {
              setModalVisible(false);
              console.log("in emot");
            }
          }
        ]
      );
    } else {
      db.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO ATTENDANCE (emp_name, starting_time,ending_time, password) values (?, ?, ?, ?)",
          [
            data?.employeeLogin[0]?.name,
            starting_time,
            ending_time,
            attenPassword
          ],
          (_, result) => {
            Alert.alert(
              "Attendance",
              "Your attendance has been marked successfully",
              [
                {
                  text: "OK",
                  onPress: () => {
                    setModalVisible(false);
                    setStarting_time("");
                    setEnding_time("");
                    setAttenPassword("");

                    // navigation.navigate("EmpHomeScreen")
                  }
                }
              ]
            );
          }
        );
      });
    }
  };

  const EmptyFields = () => {
    if (starting_time == "" || ending_time == "" || attenPassword == "") {
      Alert.alert(
        "Empty Fields",
        "Please Enter Starting Time, Ending Time and Password",
        [
          {
            text: "OK",
            onPress: () => {
              console.log("in emot");
            }
          }
        ]
      );
    } else {
      setModalVisible(true);
    }
  };

  return (
    <>
      <View
        style={{
          height: "100%",
          alignItems: "center",
          opacity: modalVisible ? 0.5 : 1
        }}
      >
        <View
          style={{
            height: "8%",
            width: "100%",
            backgroundColor: "#079DDF",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingLeft: 10,
            paddingRight: 10,
            opacity: modalVisible ? 0.5 : 1
          }}
        ></View>

        <View
          style={{ height: "100%", backgroundColor: "#002F65", width: "100%" }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 30,
              fontWeight: "bold",
              marginTop: 20,
              marginLeft: 20
            }}
          >
            Attendance
          </Text>
          <View
            style={{
              flexDirection: "row",
              margin: 20,
              backgroundColor: "#587697",
              justifyContent: "center",
              padding: 10,
              borderRadius: 20
            }}
          >
            <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
              Hello, {data?.employeeLogin[0]?.name}
            </Text>
          </View>
          <ScrollView
            style={{ margin: 40 }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="always"
            automaticallyAdjustKeyboardInsets={true}
          >
            <View style={{ padding: 10 }}>
              <TextInputField
                placeholder="Enter Starting Time"
                text={"STARTING TIME"}
                identifier={"StartingTime"}
                setStarting_time={setStarting_time}
              />
              <TextInputField
                placeholder="Enter Ending Time"
                text={"ENDING TIME"}
                identifier={"EndingTime"}
                setEnding_time={setEnding_time}
              />
              <TextInputField
                placeholder="Enter Password"
                text={"PASSWORD"}
                identifier={"AttendanecPassword"}
                setAttenPassword={setAttenPassword}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                EmptyFields();
                // setModalVisible(true)
              }}
              style={{
                alignSelf: "center",
                backgroundColor: "#355374",
                margin: 10,
                padding: 10,
                borderRadius: 20
              }}
            >
              <Text style={{ color: "white", fontSize: 20, letterSpacing: 2 }}>
                Submit
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View
          style={{
            height: "100%",
            backgroundColor: "transparent",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <View
            style={{ backgroundColor: "white", borderRadius: 20, padding: 10 }}
          >
            <Text
              style={{
                color: "#000",
                fontSize: 17,
                textAlign: "center",
                padding: 10,
                fontWeight: "600"
              }}
            >
              Hello, {data?.employeeLogin[0]?.name}
            </Text>
            <Text
              style={{
                color: "#000",
                fontSize: 17,
                textAlign: "center",
                padding: 10,
                fontWeight: "600"
              }}
            >
              Your Attendance has been marked
            </Text>
            <TouchableOpacity
              onPress={() => {
                submitAttendance();
                // setModalVisible(false)
              }}
              style={{
                alignSelf: "center",
                backgroundColor: "#355374",
                margin: 10,
                padding: 10,
                borderRadius: 20
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 20,
                  letterSpacing: 2,
                  fontWeight: "600"
                }}
              >
                OK
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default EmpAttendance;

const styles = StyleSheet.create({});

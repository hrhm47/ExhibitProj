import {
  Alert,
  Image,
  Modal,
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
import * as SQLite from "expo-sqlite";
import TextInputField from "../components/TextInputField";
import { useSelector, useDispatch } from "react-redux";

const DailyShifts = () => {
  // ==========================  for employee section ===================
  const [employeName, setEmployeName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [hireDate, setHireDate] = useState("");

  const data = useSelector((state) => state?.employees);
  const [modalVisible, setModalVisible] = useState(false);

  const [db, setDb] = useState(SQLite.openDatabase("example.db"));

  // employees is storing from admin with role too.

  // const employeeParams= [
  //   "Khalel Khaleef",
  //   "12/11/1977",
  //   "male",
  //   "khalel@gmail.com",
  //   "03120009998",
  //   "Qatar",
  //   "enginner",
  //   "manager",
  //   "khalel",
  //   "123456",
  //   "12/11/2020",
  //   1
  // ]

  // db.transaction((tx) => {
  //   tx.executeSql(
  //     "INSERT INTO EMPLOYEES (name, date_of_birth, gender, email, phone, address, job_title, role, username, password, hire_date, manager_id) values (?, ?, ?, ?,?,?,?,?,?,?,?,?)",
  //     managerParams,
  //     (_, result) => {
  //       console.log("Inserting Result:", result);
  //     },
  //     (_, error) => {
  //       console.error("Error executing insert query:", error);
  //     }
  //   );
  // });

  const saveEmployeesData = () => {
    // ==> employee attritubes name, date_of_birth, gender, email, phone, address, job_title, role, username, password, hire_date, manager_id)
    if (
      employeName.trim() == "" ||
      gender.trim() == "" ||
      email.trim() == "" ||
      Password.trim() == "" ||
      phoneNumber.trim() == "" ||
      jobTitle.trim() == "" ||
      hireDate.trim() == ""
    ) {
      return Alert.alert("Error", "Please fill all the fields");
    } else {
      db.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO EMPLOYEES (name, gender, email, phone ,job_title,role,  password, hire_date) values (?, ?, ?, ?,?,?,?,?)",
          [
            employeName,
            gender,
            email,
            phoneNumber,
            jobTitle,
            "employee",
            Password,
            hireDate
          ],
          (_, result) => {
            setEmployeName("");
            setGender("");
            setEmail("");
            setPassword("");
            setPhoneNumber("");
            setJobTitle("");
            setHireDate("");
            Alert.alert("Success", "Employee Added Successfully");
            // console.log("Inserting Result:", result);
          },
          (_, error) => {
            console.error("Error executing insert query:", error);
          }
        );
      });
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
          Hello,{" "}
          {data?.employeeLogin != null ? data?.employeeLogin[0]?.name : "admin"}
        </Text>
      </View>

      <View style={styles.tagView}>
        <Text style={styles.textStyle((font = 25))}>Employees Information</Text>
      </View>
      <View style={styles.selectionView}>
        <ScrollView
          style={styles.empShiftsContainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            alignItems: "center",
            paddingBottom: 20
          }}
          keyboardShouldPersistTaps="handled"
          automaticallyAdjustKeyboardInsets={true} // or "always"
        >
          <View style={{ alignItems: "center" }}>
            {/* EMPLOYE NAME */}
            <TextInputField
              identifier="Employe_Name"
              text="EMPLOYEE NAME"
              placeholder={"Enter Employee Name"}
              setEmployeName={setEmployeName}
              // mapData={nameData}
            />

            {/* START TIME */}
            <TextInputField
              identifier="Gender"
              text="GENDER"
              placeholder={"Select Gender"}
              setGender={setGender}
            />

            {/* Shift Type */}
            <TextInputField
              identifier="Email"
              text="Email"
              placeholder={"Enter Email"}
              setEmail={setEmail}
            />

            <TextInputField
              identifier="Password"
              text="PASSWORD"
              placeholder={"Enter Password"}
              setPassword={setPassword}
            />
            <TextInputField
              identifier="Phone_Number"
              text="PHONE NUMBER"
              placeholder={"Enter Phone Number"}
              setPhoneNumber={setPhoneNumber}
            />

            {/* START TIME */}
            <TextInputField
              identifier="Job_Title"
              text="JOB TITLE"
              placeholder={"Enter Job Title"}
              setJobTitle={setJobTitle}
            />

            {/* Shift Type */}
            <TextInputField
              identifier="Hire_Date"
              text="HIRE DATE"
              placeholder={"Enter Hire Date"}
              setHireDate={setHireDate}
            />
          </View>
        </ScrollView>
      </View>
      {/* <Modal animationType="fade" transparent={true} visible={true}> */}
      <View
        style={{
          height: "100%",
          backgroundColor: "transparent",
          justifyContent: "flex-end",
          alignSelf: "flex-end",
          position: "absolute",
          bottom: 10
        }}
      >
        <View
          style={{ backgroundColor: "#079DDF", borderRadius: 20, padding: 6 }}
        >
          <TouchableOpacity
            onPress={() => {
              saveEmployeesData();
            }}
            style={{
              alignSelf: "center",
              backgroundColor: "#002F65",
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
      {/* </Modal> */}
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
    // height: "90%",
    // backgroundColor: "green",
    alignItems: "center"
    // flexDirection: "row",
    // justifyContent: "center",
    // width: "100%"
  },
  empShiftsContainer: {
    // height: "100%",
    // backgroundColor: "yellow",
    width: "90%",
    // marginBottom:90
    // height: "100%",
    marginBottom: 100
    // marginBottom: "43%"
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

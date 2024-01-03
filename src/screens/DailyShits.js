import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { Picker } from "@react-native-picker/picker";
import DailyShiftsComponents from "../components/DailyShiftsComponents";
// import * as Calendar from 'expo-calendar';
import { Calendar, Agenda } from "react-native-calendars";
import * as SQLite from "expo-sqlite";
import { useIsFocused, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

const weekData = [
  {
    id: 1,
    label: "Monday"
  },
  {
    id: 2,
    label: "Tuesday"
  },
  {
    id: 3,
    label: "Wednesday"
  },
  {
    id: 4,
    label: "Thursday"
  },
  {
    id: 5,
    label: "Friday"
  },
  {
    id: 6,
    label: "Saturday"
  },
  {
    id: 7,
    label: "Sunday"
  }
];

const DailyShifts = () => {
  const [employeName, setEmployeName] = useState("");
  const [employeeDataBase, setEmployeeDataBase] = useState([]);
  const [employeeIdDataBase, setEmployeeIdDataBase] = useState([]);

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [shiftType, setShitType] = useState("");
  const [location, setLocation] = useState("");
  const [empId, setEmpId] = useState("");
  const [weekDay, setWeekDay] = useState("Sunday");
  const [closeMe, setCloseMe] = useState(false);
  // const [employeeData, setEmployeeData] = useState(null);

  const [isDataSaved, setIsDataSaved] = useState(false);
  const [openCalender, setOpenCalender] = useState(false);

  const db = SQLite.openDatabase("example.db");

  const empDataBase = [];
  const empIdDataBase = [];
  const ifFocused = useIsFocused();

  const getData = async () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM EMPLOYEES WHERE role = ?",
        ["employee"],
        (_, result) => {
          if (result.rows.length > 0) {
            result?.rows?._array?.map((item, index) => {
              // console.log("item", item.name, index);
              empDataBase?.push(item?.name);
              empIdDataBase?.push(item?.employee_id);
            });
            // console.log("Selecting Result:", result.rows._array);
          }
          // console.log(empDataBase, "its my data");
          AsyncStorage.setItem("empDataBase", JSON.stringify(empDataBase));
          AsyncStorage.setItem("empIdDataBase", JSON.stringify(empIdDataBase));
        },
        (_, error) => {
          console.error("Error executing select query:", error);
        }
      );
    });
  };

  useEffect(() => {
    if (ifFocused) {
      getData();
      (async () => {
        await AsyncStorage?.getItem("empDataBase")?.then((value) => {
          setEmployeeDataBase(JSON.parse(value));
          // console.log(employeeDataBase, "its my dataoutsie",employeeIdDataBase);
        });
        await AsyncStorage?.getItem("empIdDataBase")?.then((value) => {
          setEmployeeIdDataBase(JSON.parse(value));
        });
      })();
    }
  }, [ifFocused]);

  // console.log(employeeDataBase, "its my dataoutsie");

  const savemydailyshift = () => {
    // console.log("call me atleat", employeeDataBase[employeName], employeeIdDataBase[employeName],startTime,endTime,shiftType,location);

    let empName = employeeDataBase[employeName]
      ? employeeDataBase[employeName]
      : "";
    let empid = employeeIdDataBase[employeName]
      ? employeeIdDataBase[employeName]
      : "";

    // console.log(empName, empid,startTime,endTime,shiftType,location, "data");

    if (
      empName == "" ||
      empid == "" ||
      startTime == "" ||
      endTime == "" ||
      shiftType == "" ||
      location == ""
    ) {
      return Alert.alert("Error", "Please fill all the fields");
    } else {
      console.log("call me atleat inside");
      db.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO SHIFT (start_time, end_time, shift_type) VALUES (?, ?, ?)",
          [startTime, endTime, shiftType],
          (tx, result) => {
            if (result.rowsAffected > 0) {
              console.log("Insert successful");
            } else {
              console.error("Insert failed");
            }
          },
          (tx, error) => {
            console.error("Error executing SQL:", error);
          }
        );
      });

      let SHIFT_ID = 0;

      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM SHIFT WHERE start_time = ? AND end_time = ? AND shift_type = ?",
          [startTime, endTime, shiftType],
          (tx, result) => {
            // Process the result here
            console.log(result.rows._array[0].shift_id, "shift data");
            SHIFT_ID = result.rows._array[0].shift_id;
          },
          (tx, error) => {
            console.error("Error executing SQL:", error);
          }
        );
      });

      db.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO EMPLOYEES_SHIFT (shift_id, employee_id) VALUES (?, ?)",
          [SHIFT_ID, empid],
          (tx, result) => {
            if (result.rowsAffected > 0) {
              console.log("Insert successful in employee shift");
            } else {
              console.error("Insert failed");
            }
          },
          (tx, error) => {
            console.error("Error executing SQL:", error);
          }
        );
      });

      Alert.alert("Success", "Shift Added Successfully", [
        {
          text: "Ok",
          onPress: () => {
            setEmployeName("");
            setStartTime("");
            setEndTime("");
            setShitType("");
            setLocation("");
          }
        }
      ]);
    }

    //   CREATE TABLE IF NOT EXISTS EMPLOYEES_SHIFT (
    //     emp_shift_id INTEGER PRIMARY KEY AUTOINCREMENT,
    //     shift_id INTEGER,
    //     employee_id INTEGER,
    //     FOREIGN KEY (shift_id) REFERENCES SHIFT(shift_id),
    //     FOREIGN KEY (employee_id) REFERENCES EMPLOYEES(employee_id)
    // )
    // let SHIFT_ID;

    // db.transaction((tx)=>{
    //   tx.executeSql(
    //     'SELECT shift_id FROM SHIFT WHERE start_time = ? AND end_time = ? AND shift_type = ? VALUES(?,?,?)'),
    //       [
    //         startTime,
    //         endTime,
    //         shiftType
    //       ],
    //   (tx,result)=>{
    //     SHIFT_ID=result.rows._array[0].shift_id
    //     console.log(SHIFT_ID, "shift id");
    //   }
    // })

    // db.transaction((tx)=>{
    //   tx.executeSql(
    //     'INSERT INTO EMPLOYEES_SHIFT (shift_id, employee_id) VALUES (?, ?)',
    //     [],(tx, result) => {
    //       if (result.rowsAffected > 0) {
    //         console.log("Insert successful");
    //       } else {
    //         console.error("Insert failed");
    //       }
    //     },
    //     (tx, error) => {
    //       console.error("Error executing SQL:", error);
    //     }
    //   )
    // })

    // }

    // db.transaction((tx) => {
    //   tx.executeSql(
    //     'DELETE FROM SHIFT', // Corrected DELETE keyword
    //     [],
    //     (_, result) => {
    //       console.log('Shift data deleted');
    //     },
    //     (_, error) => {
    //       console.error('Error deleting shift data:', error);
    //     }
    //   );
    // });
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
        <Text style={{ fontSize: 25 }}>Hello, admin</Text>
      </View>

      <View style={styles.tagView}>
        <Text style={styles.textStyle((font = 25))}>Daily Shifts</Text>
      </View>

      <View style={styles.selectionView}>
        <View style={styles.empShiftsContainer}>
          {/* EMPLOYE NAME */}
          <DailyShiftsComponents
            identifier="EmployeName"
            labelText="EMPLOYEE NAME"
            mapData={!employeeDataBase ? null : employeeDataBase}
            setEmployeName={setEmployeName}
          />

          {/* START TIME */}
          <DailyShiftsComponents
            identifier="startTime"
            labelText="START TIME"
            mapData={startTimeData}
            setStartTime={setStartTime}
          />

          {/* Shift Type */}
          <DailyShiftsComponents
            identifier="shiftType"
            labelText="SHIFT TYPE"
            mapData={shiftTypeData}
            setShitType={setShitType}
          />
        </View>

        <View style={styles.empShiftsContainer}>
          {/* EMPLOYE NAME */}
          <DailyShiftsComponents
            identifier={
              !employeeIdDataBase ? " " : employeeIdDataBase[employeName]
            }
            labelText="EMPLOYEE ID"
            // setEmpId={setEmpId}
            // mapData={employeeIdDataBase?employeeIdDataBase:[]}
          />

          {/* START TIME */}
          <DailyShiftsComponents
            identifier="endTime"
            labelText="END TIME"
            mapData={endTimeData}
            setEndTime={setEndTime}
          />

          {/* Shift Type */}
          <DailyShiftsComponents
            identifier="shiftLocation"
            labelText="SHIFT LOCATION"
            mapData={shitLocData}
            setLocation={setLocation}
          />
        </View>
      </View>
      <TouchableOpacity
        style={styles.saveButtonStyle}
        onPress={() => {
          savemydailyshift();

          console.log("call me");
        }}
      >
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
            {/* <Agenda
              style={{
                // borderWidth: 1,
                // borderColor: 'gray',
                // width:"70%",
                height: "100%"
              }}
              headerStyle={{ width: "70%" }}
            /> */}
            <DailyShiftsComponents
              identifier="weekdaysData"
              // labelText={weekDay}
              mapData={weekData}
              setWeekDay={setWeekDay}
              setCloseMe={setCloseMe}
              margin={0}
              // height={0}
            />
            <View
              style={{ width: "100%" }}
              onStartShouldSetResponder={() => setOpenCalender(false)}
            ></View>
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
              <Text style={styles.empText}>
                {!employeeDataBase ? "" : employeeDataBase[employeName]}
              </Text>
              <Text style={styles.empText}>
                {!employeeDataBase ? "" : employeeIdDataBase[employeName]}
              </Text>
              <Text style={styles.empText}>{startTime}</Text>
              <Text style={styles.empText}>{endTime}</Text>
              <Text style={styles.empText}>{shiftType}</Text>
              <Text style={styles.empText}>{location}</Text>
            </View>
            <View
              style={{
                backgroundColor: "#333",
                // backgroundColor:"red",
                width: "30%",
                // justifyContent: "space-between",
                alignItems: "center"
                // backgroundColor: "white",
              }}
            >
              {/* <Text style={styles.empText}>{weekData[weekDay-1]?.label}</Text> */}

              <View
                style={{
                  justifyContent: "space-between",
                  width: "100%",
                  height: "90%",
                  position: "relative"
                }}
              >
                <TouchableOpacity
                  style={{
                    // position:"absolute",
                    // top:-10,
                    // right:5,
                    backgroundColor: "#079DDF",
                    // backgroundColor: "yellow",
                    alignItems: "center",
                    padding: 8,
                    borderRadius: 10,
                    width: "100%"
                  }}
                  onPress={() => {
                    setOpenCalender((openCalender) => !openCalender);
                  }}
                >
                  <Text style={[styles.empText,{fontSize:14}]}>
                    {weekDay ? weekData[weekDay - 1]?.label : "Calendar"}
                  </Text>
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
    paddingTop: 10,
    marginBottom:10,
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
    // textAlign:"center"
  }
});

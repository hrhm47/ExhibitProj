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
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { Picker } from "@react-native-picker/picker";
import DailyShiftsComponents from "../components/DailyShiftsComponents";
// import * as Calendar from 'expo-calendar';
import { Calendar, Agenda } from "react-native-calendars";

import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell
} from "react-native-table-component";
import * as Sqlite from "expo-sqlite";
import { useSelector, useDispatch } from "react-redux";

const Reports = () => {
  const reportType = [
    {
      id: "RP001",
      label: "Attendance Report"
    },
    {
      id: "RP002",
      label: "Shift_Schedule Report"
    }
  ];

  const [reportIdValue, setReportIdValue] = useState();
  const [reportTypeValue, setReportTypeValue] = useState();
  const [myDailyAttendances, setMyDailyAttendances] = useState([]);
  const [myShiftsData, setMyShiftsData] = useState([]);

  const data = useSelector((state) => state?.employees);
  const db = Sqlite.openDatabase("example.db");

  useEffect(() => {
    let myAttendance = [];
    reportType.map(async (item) => {
      if (item.id === reportTypeValue) {
        // Assuming setReportIdValue returns a Promise
        await setReportIdValue(item.id);
        // You might want to add a return statement here if needed
      }
    });

    // Use an async function to await the Promise returned by setReportIdValue
    let employee_Ids = [];
    let shift_ids = [];
    let employee_full_data = [];
    let shift_full_data = [];
    let transformedData = [];

    const handleReportType = async () => {
      if (reportTypeValue === "RP002") {
        setMyDailyAttendances([]);
        // ...
        (() => {
          let SHIFT_ID = [];
          db.transaction((tx) => {
            tx.executeSql(
              "SELECT * FROM EMPLOYEES_SHIFT",
              [],
              (_, result) => {
                result.rows._array.map((item) => {
                  employee_Ids.push(item.employee_id);
                  shift_ids.push(item.shift_id);
                });
                db.transaction((tx1) => {
                  tx1.executeSql(
                    "SELECT * FROM EMPLOYEES",
                    [],
                    (_, result1) => {
                      // console.log("employee data",result1.rows._array);
                      employee_Ids.map((item, index) => {
                        result1.rows._array.map((item1, index1) => {
                          if (item1.employee_id == employee_Ids[index]) {
                            employee_full_data.push(item1.name);
                          }
                        });
                      });
                    }
                  );
                });

                // shifts data
                db.transaction((tx2) => {
                  tx2.executeSql(
                    "SELECT * FROM SHIFT",
                    [],
                    (_, result2) => {
                      myDailyShift = result2.rows._array.filter((item) =>
                        SHIFT_ID.push(item)
                      );
                      SHIFT_ID.map((item, index) => {
                        if (item.shift_id == shift_ids[index]) {
                          shift_full_data.push(item);
                        }
                      });

                      transformedData = employee_full_data.map(
                        (employee, index) => {
                          const shiftData = shift_full_data[index] || {};
                          const { end_time, start_time } = shiftData;
                          return [employee, start_time, end_time];
                        }
                      );
                      // console.log("transformed data",transformedData);
                      if (myShiftsData.length >= 0) {
                        setMyShiftsData([]);
                        setMyShiftsData(transformedData);
                        // console.log("my shifts data", transformedData);
                      }
                    },
                    (_, error2) => {
                      console.error(
                        "Error executing SQL (second transaction):",
                        error2
                      );
                    }
                  );
                });
              },
              (_, error) => {
                console.error(
                  "Error executing SQL (first transaction):",
                  error
                );
              }
            );
          });
        })();
      } else {
        setMyShiftsData([]);
        // console.log("im in if condition of RP001");
        // ........................

        (() => {
          db.transaction((tx) => {
            tx.executeSql("SELECT * FROM ATTENDANCE", [], (_, result) => {
              // console.log("Result from employees -> ", result.rows._array);
              result.rows._array.map((item) => {
                myAttendance.push(item);
              });
              // console.log(myDailyAttendances.length>=0?myAttendance.length:"no data");
              if (myDailyAttendances.length >= 0) {
                setMyDailyAttendances([]);
                setMyDailyAttendances(myAttendance);
              }

              // console.log("my attendance",myAttendance);
            });
          });
        })();
      }
    };

    // Call the async function to handle the logic
    handleReportType();

    // setReportIdValue(reportType);
  }, [reportTypeValue]);
  console.log("my shifts data ",myShiftsData);

  const rowData = {
    tableHead: ["Employee Name", "Check-In Time", "Check-Out Time"],
    tableData:
      reportTypeValue === "RP002"
        ? myShiftsData
        : myDailyAttendances?.map((item) => [
            item.emp_name,
            item.starting_time,
            item.ending_time
          ])
  };

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
        <Text style={{ fontSize: 25 }}>
          Hello, {data?.employeeLogin ? data?.employeeLogin[0]?.name : "admin"}
        </Text>
      </View>

      <View style={styles.tagView}>
        <Text style={styles.textStyle((font = 25))}>Reports</Text>
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
            identifier={reportIdValue ? reportIdValue : ""}
            labelText="REPORT ID"
            // mapData={nameData}
            // setReportIdValue={setReportIdValue}
            margin={0}
          />

          {/* EXHIBIT ID */}
          <DailyShiftsComponents
            identifier="RportType"
            labelText="REPORT TYPE"
            mapData={reportType}
            setReportTypeValue={setReportTypeValue}
            margin={0}
          />
        </View>
      </View>
      <Text
        style={{
          paddingLeft: 10,
          paddingBottom: 10,
          fontWeight: "500",
          fontSize: 15,
          letterSpacing: 1,
          color: "white"
          // textAlign:"left"
        }}
      >
        Report ID:{" "}
        {reportTypeValue == "RPOO1"
          ? "1-10-2023"
          : reportTypeValue == "RP002"
          ? "3-10-2023"
          : "29-9-2023"}
      </Text>

      <View
        style={{
          height: "50%",
          backgroundColor: "#A1B0C1",
          width: "80%",
          margin: 5,
          borderRadius: 20,
          padding: 5
        }}
      >
        {/* <ScrollView> */}
        <Table borderStyle={{ borderWidth: 1, borderColor: "#C1C0B9" }}>
          <Row
            data={rowData.tableHead}
            // widthArr={state.widthArr}
            style={styles.head}
            textStyle={styles.text}
          />
        </Table>
        <ScrollView scrollEnabled>
          <Table borderStyle={{ borderWidth: 1, borderColor: "#C1C0B9" }}>
            {rowData.tableData.map((item, index) => (
              <Row
                key={item}
                data={item}
                // widthArr={state.widthArr}
                style={[styles.row]}
                textStyle={styles.text}
              />
            ))}
          </Table>
        </ScrollView>
      </View>
    </View>
  );
};

export default Reports;

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
    height: "25%",
    // backgroundColor: "green",
    // alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    padding: "1%",
    top: "3%"
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
  }),
  head: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 10
    // backgroundColor: "#f1f8ff"
  },
  wrapper: { flexDirection: "row" },
  title: { color: "#000" },
  row: { height: 50 },
  text: { textAlign: "center", color: "#000", fontWeight: "500" }
});

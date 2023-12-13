import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView
} from "react-native";
import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { Camera, CameraType } from "expo-camera";
import * as Sqlite from "expo-sqlite";

import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell
} from "react-native-table-component";

const EmpShifts = () => {
  const data = useSelector((state) => state.employees);
  console.log(data?.employeeLogin[0]?.employee_id);
  const dispatch = useDispatch();

  const db = Sqlite.openDatabase("example.db");
  const [myDailyShifts, setMyDailyShifts] = useState([]);
  let myDailyShift = [];
  useEffect(() => {
    (() => {
      let id=data?.employeeLogin[0]?.employee_id
      let SHIFT_ID = [];
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM EMPLOYEES_SHIFT WHERE employee_id = ?",
          [id],
          (_, result) => {
            result.rows._array.map((item) => {
              item.employee_id == data?.employeeLogin[0]?.employee_id ? SHIFT_ID.push(item.shift_id) : null;
            });
            // SHIFT_ID = result.rows._array.filter((item) => item.employee_id==8);
            console.log("Result from employee shift: ", SHIFT_ID);

            // Second transaction inside the success callback of the first one
            db.transaction((tx2) => {
              tx2.executeSql(
                "SELECT * FROM SHIFT",
                [],
                (_, result2) => {
                  myDailyShift = result2.rows._array.filter((item) =>
                    SHIFT_ID.includes(item.shift_id)
                  );
                  setMyDailyShifts(myDailyShift);
                  console.log("Filtered Shift Data:", myDailyShift);

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
            console.error("Error executing SQL (first transaction):", error);
          }
        );
      });
    })();
  }, []);

  const rowData = {
    tableHead: ["Start Time", "End Time", "Shift Type"],
    tableData: myDailyShifts.map((item) => [
      item.start_time,
      item.end_time,
      item.shift_type
    ])
  };

  return (
    <View
      style={{
        height: "100%",
        alignItems: "center",
        backgroundColor: "#002F65"
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
          paddingRight: 10
        }}
      >
        <Text style={{ fontSize: 25 }}>
          Hello, {data?.employeeLogin[0]?.name}
        </Text>
        {/* <TouchableOpacity onPress={()=>navigation.navigate('AdminSettings')}>
        <Icon name="user" size={40} color={"white"} />
      </TouchableOpacity> */}
      </View>
      <Text style={[styles.text, { fontSize: 29 }]}>Work Schedule</Text>
      <View
        style={{
          backgroundColor: "#355274",
          height: "10%",
          width: "90%",
          margin: 10,
          borderRadius: 10,
          padding: 10
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <Text
            style={{
              color: "white",
              fontSize: 16,
              fontWeight: "500",
              letterSpacing: 1
            }}
          >
            Employee Name
          </Text>
          <Text
            style={{
              color: "white",
              fontSize: 16,
              fontWeight: "500",
              letterSpacing: 1
            }}
          >
            Employee Id
          </Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <Text
            style={{
              color: "white",
              fontSize: 16,
              fontWeight: "500",
              paddingVertical: 5
            }}
          >
            {data?.employeeLogin[0]?.name}
          </Text>
          <Text
            style={{
              color: "white",
              fontSize: 16,
              fontWeight: "500",
              paddingVertical: 5
            }}
          >
            {data?.employeeLogin[0]?.employee_id}
          </Text>
        </View>
      </View>
      <View
        style={{
          height: "60%",
          width: "90%",
          backgroundColor: "#355274",
          borderRadius: 10
        }}
      >
        <View
          style={{
            margin: 5,
            padding: 5
          }}
        >
          {/* <ScrollView> */}
          <Table borderStyle={{ borderWidth: 1, borderColor: "#1c3c2c" }}>
            <Row
              data={rowData.tableHead}
              // widthArr={state.widthArr}
              style={styles.head}
              textStyle={styles.text}
            />
          </Table>
          <ScrollView scrollEnabled>
            <Table borderStyle={{ borderWidth: 1, borderColor: "#333" }}>
              {rowData.tableData.map((item, index) => (
                <Row
                  key={item}
                  data={item}
                  // widthArr={state.widthArr}
                  style={[
                    styles.row,
                    index % 2 && { backgroundColor: "#1c1c1c" }
                  ]}
                  textStyle={styles.text}
                />
              ))}
            </Table>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default EmpShifts;

const styles = StyleSheet.create({
  head: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 3
    // backgroundColor: "#f1f8ff"
  },
  wrapper: { flexDirection: "row" },
  title: { color: "#000" },
  row: { height: 50 },
  text: {
    textAlign: "center",
    color: "#fff",
    fontSize: 15,
    fontWeight: "500",
    padding: 10
  }
});

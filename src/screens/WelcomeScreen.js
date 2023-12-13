import { Alert, Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector, useDispatch } from "react-redux";
import employeeActions from "../app/action/action";
import * as SQLite from "expo-sqlite";
import * as Progress from "react-native-progress";
const value = 1;
const WelcomeScreen = () => {
  const navigation = useNavigation();
  const [progress, setProgress] = useState(0);
  const [indeterminate, setIndeterminate] = useState(true);
  // const db = SQLite.openDatabase("newMain1.db");
  const [db, setDb] = useState(SQLite.openDatabase('example.db'));


  const initDataBase = () => {
    console.log("initDataBase");
    // create the data employee table

    db.transaction((tx) => {
      // Create the EMPLOYEES table
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS EMPLOYEES (
            employee_id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            date_of_birth TEXT,
            gender TEXT,
            email TEXT,
            phone TEXT,
            address TEXT,
            job_title TEXT,
            role TEXT,
            username TEXT,
            password TEXT,
            hire_date TEXT,
            manager_id INTEGER,
            FOREIGN KEY (manager_id) REFERENCES EMPLOYEES(employee_id)
          );`,
        [],
        (_, result) => {
          console.log("Table created successfully:", result);
        },
        (_, error) => {
          console.error("Error creating table:", error);
        }
      );
    });

    db.transaction((tx) => {
      // Create the EMPLOYEES table
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS TECHNICIAN (
          tech_id INTEGER PRIMARY KEY AUTOINCREMENT,
          tech_name TEXT,
          title TEXT,
          specialty TEXT,
          phone TEXT,
          email TEXT,
          hire_date TEXT
      );`,
        [],
        (_, result) => {
          console.log("Table created successfully:", result);
        },
        (_, error) => {
          console.error("Error creating table:", error);
        }
      );
    });

    db.transaction((tx) => {
      // Create the EMPLOYEES table
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS SHIFT (
          shift_id INTEGER PRIMARY KEY AUTOINCREMENT,
          start_time TEXT,
          end_time TEXT,
          shift_type TEXT
      );`,
        [],
        (_, result) => {
          console.log("Table created successfully:", result);
        },
        (_, error) => {
          console.error("Error creating table:", error);
        }
      );
    });

    db.transaction((tx) => {
      // Create the EMPLOYEES table
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS EMPLOYEES_SHIFT (
          emp_shift_id INTEGER PRIMARY KEY AUTOINCREMENT,
          shift_id INTEGER,
          employee_id INTEGER,
          FOREIGN KEY (shift_id) REFERENCES SHIFT(shift_id),
          FOREIGN KEY (employee_id) REFERENCES EMPLOYEES(employee_id)
      );`,
        [],
        (_, result) => {
          console.log("Table created successfully:", result);
        },
        (_, error) => {
          console.error("Error creating table:", error);
        }
      );
    });

    db.transaction((tx) => {
      // Create the EMPLOYEES table
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS REPORT (
          report_id INTEGER PRIMARY KEY AUTOINCREMENT,
          employee_id INTEGER,
          report_date TEXT,
          report_type TEXT,
          comments TEXT,
          FOREIGN KEY (employee_id) REFERENCES EMPLOYEES(employee_id)
      );`,
        [],
        (_, result) => {
          console.log("Table created successfully:", result);
        },
        (_, error) => {
          console.error("Error creating table:", error);
        }
      );
    });

    db.transaction((tx) => {
      // Create the EMPLOYEES table
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS EXHIBIT (
          exhibit_id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          description TEXT,
          type TEXT,
          location TEXT,
          installation_date TEXT,
          qr_code BLOB
      );`,
        [],
        (_, result) => {
          console.log("Table created successfully:", result);
        },
        (_, error) => {
          console.error("Error creating table:", error);
        }
      );
    });

    db.transaction((tx) => {
      // Create the EMPLOYEES table
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS EXHIBIT_ISSUES (
          issue_id INTEGER PRIMARY KEY AUTOINCREMENT,
          employee_id INTEGER,
          exhibit_id INTEGER,
          tech_id INTEGER,
          issue_date TEXT,
          resolve_date TEXT,
          status TEXT,
          priority TEXT,
          issue_details TEXT,
          resolve_details TEXT,
          FOREIGN KEY (employee_id) REFERENCES EMPLOYEES(employee_id),
          FOREIGN KEY (exhibit_id) REFERENCES EXHIBIT(exhibit_id),
          FOREIGN KEY (tech_id) REFERENCES TECHNICIAN(tech_id)
      );`,
        [],
        (_, result) => {
          console.log("Table created successfully:", result);
        },
        (_, error) => {
          console.error("Error creating table:", error);
        }
      );
    });

    // attendance table

    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS ATTENDANCE  (
          emp_id INTEGER PRIMARY KEY AUTOINCREMENT,
          emp_name TEXT NOT NULL,
          starting_time TEXT,
          ending_time TEXT,
          password TEXT
        )`,
        [],
        (_, result) => {
          // console.log('Table created successfully');
          // Alert.alert("Welcome to Scientific Lab With Tables Created Successfully")
        },
        (_, error) => {
          console.error('Error creating table:', error);
        }
      );
    });




  };


  const insertDataBase=()=>{
    const managerParams=["khan waqar","12/09/1987","male","khanwaqar@gmail.com","03125634567","pindi","clerk","employee","khanWaqar","123456","12/09/2020",1]
    // AsyncStorage.setItem("isFirstTime",JSON.stringify(managerParams));

    const employeeParams= [
      "Khalel Khaleef",
      "12/11/1977",
      "male",
      "khalel@gmail.com",
      "03120009998",
      "Qatar",
      "enginner",
      "manager",
      "khalel",
      "123456",
      "12/11/2020",
      1
    ]

    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO EMPLOYEES (name, date_of_birth, gender, email, phone, address, job_title, role, username, password, hire_date, manager_id) values (?, ?, ?, ?,?,?,?,?,?,?,?,?)",
        managerParams,
        (_, result) => {
          console.log("Inserting Result:", result);
        },
        (_, error) => {
          console.error("Error executing insert query:", error);
        }
      );
    });


    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO EMPLOYEES (name, date_of_birth, gender, email, phone, address, job_title, role, username, password, hire_date, manager_id) values (?, ?, ?, ?,?,?,?,?,?,?,?,?)",
        employeeParams,
        (_, result) => {
          // console.log("Inserting Result:", result);
          // Alert.alert("Welcome to Scientific Lab")
        },
        (_, error) => {
          console.error("Error executing insert query:", error);
        }
      );
    });


  }

  useEffect(() => {
    let interval;

    const timer = setTimeout(() => {
      setIndeterminate(false);
      interval = setInterval(() => {
        setProgress((prevProgress) =>
          Math.min(1, prevProgress + Math.random() / 3)
        );
      }, 500);
    }, 1500);
    if (progress >= 1) {
      initDataBase();
      insertDataBase();
      navigation.navigate("Login");
    }
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [progress]);

  return (
    <View style={styles.container}>
      <View style={{ height: "7%", backgroundColor: "#079DDF" }}></View>
      <View
        style={{
          height: "95%",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Text
          style={{
            textAlign: "center",
            lineHeight: 50,
            fontSize: 35,
            fontWeight: "700",
            letterSpacing: 2,
            marginBottom: 10
          }}
        >
          {"Welcome \n to \nScientific Lab"}
        </Text>
        <Progress.Bar
          progress={progress}
          width={250}
          height={10}
          animated={true}
          animationType="timing"
          indeterminate={indeterminate}
          color="#079DDF"
        />
        <Image
          source={require("../../assets/logo.png")}
          style={{ top: 20 }}
          width={30}
          height={30}
        />
      </View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FBFCF7"
  }
});

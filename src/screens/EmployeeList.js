import { FlatList, ScrollView, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useIsFocused, useRoute,useNavigation } from "@react-navigation/native";
import * as SQLite from "expo-sqlite";
import Icon from "react-native-vector-icons/Ionicons";
import { useSelector, useDispatch } from "react-redux";



const EmployeeList = () => {

    const isFocoused = useIsFocused();
    const navigation = useNavigation();

    const empDataBase = [];
    const empIdDataBase = [];
    
    const [empNames,setEmpNames] = useState([])
    const [empIds,setEmpIds] = useState([])

    const data = useSelector((state) => state?.employees);

    const [db, setDb] = useState(SQLite.openDatabase("example.db"));


  const getData = async () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM EMPLOYEES WHERE role = ?",
        ["employee"],
        (_, result) => {
          if (result.rows.length > 0) {
            result?.rows?._array?.map((item, index) => {
              console.log("item", item.name, index);
              empDataBase?.push(item?.name);
              empIdDataBase?.push(item?.employee_id);
            });
            setEmpNames(empDataBase)
            setEmpIds(empIdDataBase)
            // console.log("Selecting Result:", result.rows._array);
          }
          // console.log(empDataBase, "its my data");
        //   AsyncStorage.setItem("empDataBase", JSON.stringify(empDataBase));
        //   AsyncStorage.setItem("empIdDataBase", JSON.stringify(empIdDataBase));
        },
        (_, error) => {
          console.error("Error executing select query:", error);
        }
      );
    });
  };


  useEffect(()=>{
    if(isFocoused){
      getData().then(()=>{
        console.log("data is fetched", empNames, empIds);
      })
    }

  },[isFocoused])





  return (
    <View
      style={{
        height: "100%",
        alignItems: "center",
        backgroundColor: "#002F65"
      }}
    >
      <View style={styles.headerView}>
        <Text style={{ fontSize: 25 }}> Hello,{" "}
          {data?.employeeLogin != null ? data?.employeeLogin[0]?.name : "admin"}</Text>
      </View>
      <View style={styles.tagView}>
        <Text
          style={[
            styles.textStyle((font = 25)),
            { textAlign: "center", alignSelf: "center" }
          ]}
        >
          Employees Information
        </Text>
      </View>
      <View
        style={{
          marginTop: 10,
          width: "100%",
          height: "75%",
          flexDirection: "row"
        }}
      >
        <View style={{ width: "50%", height: "100%" }}>
            <ScrollView>
            {empNames?.map((item,index)=>(
                <TouchableHighlight
                key={index}
                style={{
                    padding: 10,
                    backgroundColor: "skyblue",
                    margin: 5,
                    borderRadius: 10,
                    alignItems: "center"
                }}
                >
                <Text style={{}}>{item} </Text>
              </TouchableHighlight>
            ))}
            </ScrollView>
        </View>
        <View style={{ width: "50%", height: "100%" }}>
        <ScrollView>
            {empIds?.map((item,index)=>(
                <TouchableHighlight
                key={index}
                style={{
                    padding: 10,
                    backgroundColor: "skyblue",
                    margin: 5,
                    borderRadius: 10,
                    alignItems: "center"
                }}
                >
                <Text style={{}}>{item} </Text>
              </TouchableHighlight>
            ))}
            </ScrollView>
        </View>
      </View>
      <View style={{ marginTop:10, alignItems:"flex-start", width:"100%", paddingLeft:10}}>
        <TouchableOpacity onPress={()=>navigation.navigate('Employess')}>
          <Icon name="chevron-back" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EmployeeList;

const styles = StyleSheet.create({
  headerView: {
    height: "8%",
    width: "100%",
    backgroundColor: "#079DDF",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10
  },
  tagView: {
    // alignItems: "center",
    // justifyContent:"center",
    width: "100%",
    paddingLeft: 15,
    paddingTop: 10,
    flexDirection: "row"
  },
  textStyle: (font) => ({
    color: "white",
    fontSize: font,
    fontWeight: "500",
    letterSpacing: 2
  })
});

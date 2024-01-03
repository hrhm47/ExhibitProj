import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import React, { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { useSelector, useDispatch } from "react-redux";
import {useIsFocused, useNavigation} from "@react-navigation/native"
import * as SQLite from "expo-sqlite";
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";


const techId = [
  {
    id: 1
    // label: "Ali"
  },
  {
    id: 2
    // label: "Kabir"
  },
  {
    id: 3
    // label: "Salim"
  }
];

const techName = [
  {
    id: 1,
    label: "Mike Jhonson"
  },
  {
    id: 2,
    label: "Mate"
  },
  {
    id: 3,
    label: "Salim"
  }
];

const ExhibitsIssues = () => {
  const [employeName, setEmployeName] = useState("");
  // const [issuesLength, setIssuesLength] = useState(0);
  // let issueLength=0;
  
  const [exbName, setExbName] = useState("");
  const [exbId, setExbId] = useState("");
  const [exbDate, setExbDate] = useState("");
  const [exbStatus, setExbStatus] = useState("");
  const [exbPriority, setExbPriority] = useState("");
  const [exbempName, setExbempName] = useState("");
  const [nameData, setNameData] = useState([]);


  // all data storing in this state one by one

  const [allEmployeName, setAllEmployeName] = useState([]);
  const [allDateIssued, setAllDateIssued] = useState([]);
  const [allStatus, setAllStatus] = useState([]);
  const [allPriority, setAllPriority] = useState([]);
  const [allExhibitData, setAllExhibitData] = useState([]);

  const foucused = useIsFocused();
  const data = useSelector((state) => state?.employees);
  const [db, setDb] = useState(SQLite.openDatabase("example.db"))
  // console.log(data?.employeeLogin[0]?.employee_id);
  // const dispatch = useDispatch();

  let allEmp=[];
  let allDate=[];
  let allStatuses=[];
  let allPrioritys=[];
  let allExhibits=[];
  let newNames = [];

  useEffect(()=>{
    if (foucused){
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM EXHIBIT_ISSUES",[],(_, result) => {
            // console.log("result", result.rows._array);
            result.rows._array.map((item,index)=>{
              
              // now getting all Employee Names
              db.transaction((emptx) => {
                emptx.executeSql(
                  "SELECT * FROM EMPLOYEES WHERE employee_id = ?",[item.employee_id],(_, result) => {
                    // console.log("result",index, result.rows._array);
                    allEmp.push({id:index,label:result.rows._array[0].name});
                    // setAllEmployeName(allEmp)
                  }
                )
              })

              // now getting all Date Issued
              allDate.push({id:index,label:item.issue_date})
              
              // all statues
              allStatuses.push({id:index,label:item.status})

              // all priorities
              allPrioritys.push({id:index,label:item.priority})

              // all exhibits
              allExhibits.push({id:index,label:item})

            })

            console.log("allEmp",allEmp,allDate,allStatuses,allPrioritys,allExhibits);
            setAllEmployeName(allEmp)
            setAllDateIssued(allDate)
            setAllStatus(allStatuses)
            setAllPriority(allPrioritys)
            setAllExhibitData(allExhibits)
            
          },
          (_, error) => {
            console.error("Error executing select query:", error);
          }
        )
      })

    }
    (async () => {
      try {
        const exibitData = JSON.parse(
          await AsyncStorage.getItem("exbibitData")
        );
          console.log("exibitData", exibitData);
        if (exibitData && Array.isArray(exibitData)) {
          exibitData.forEach((item, index) => {
            // console.log("item", item);
            newNames.push({
              id: index,
              label: item.exhibitName
            });
          });
        }
        setNameData(newNames);
      } catch (error) {
        console.error("Error retrieving and parsing exhibit data:", error);
        // Handle the error as needed
      }
    })();
  },[foucused])

  const [issueLength, setIssueLength] = useState(0);

  const rightClickMove=()=>{
    // console.log("rightClickMove", allExhibitData);
    // const arrayDatalength=allExhibitData.length;
    console.log(issueLength);
    const arrayDataLength = allExhibitData.length;
    console.log(nameData[allExhibitData[issueLength-1]?.label?.exhibit_id]?.label);
    if (issueLength <= arrayDataLength - 1) {
      // console.log(arrayDatalength,"issueLength",allEmployeName[issueLength]?.label,
      // allExhibitData[issueLength]?.label.priority,
      // allExhibitData[issueLength]?.label.issue_date,
      // allExhibitData[issueLength]?.label.exhibit_id
      // );
      // // // name done
      setExbName(nameData[allExhibitData[issueLength]?.label?.exhibit_id]?.label)
      setExbId (allExhibitData[issueLength]?.label.exhibit_id);
      setExbDate(allExhibitData[issueLength]?.label.issue_date);
      setExbStatus(allExhibitData[issueLength]?.label.status);
      setExbPriority(allExhibitData[issueLength]?.label.priority);
      setExbempName(allEmployeName[issueLength]?.label);
      
      setIssueLength((prevLength) => prevLength + 1);
    }else{
      alert("Alert","No more data")
    }
    // issueLength=issueLength+1;
  }

  const leftClickMove=()=>{
    console.log("halar khaab", issueLength);

    if (issueLength > 0) {
      // console.log(arrayDatalength,"issueLength",allEmployeName[issueLength]?.label,
      // allExhibitData[issueLength]?.label.priority,
      // allExhibitData[issueLength]?.label.issue_date,
      // allExhibitData[issueLength]?.label.exhibit_id
      // );
      
      // // name done
      setExbName(nameData[allExhibitData[issueLength]?.label?.exhibit_id]?.label)
      setExbId (allExhibitData[issueLength]?.label.exhibit_id);
      setExbDate(allExhibitData[issueLength]?.label.issue_date);
      setExbStatus(allExhibitData[issueLength]?.label.status);
      setExbPriority(allExhibitData[issueLength]?.label.priority);
      setExbempName(allEmployeName[issueLength]?.label);
      
      setIssueLength((prevLength) => prevLength - 1)
    }else{
      alert("Alert","No more data")
    }
    // issueLength=issueLength-1;
  }



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
          Hello,
          {data?.employeeLogin ? data?.employeeLogin[0]?.name : " admin"}
        </Text>
      </View>

      <View style={styles.tagView}>
        <Text style={styles.textStyle((font = 25))}>Exhibit Issues</Text>
      </View>

      <ScrollView
        contentContainerStyle={{ height: "100%", width: "100%" }}
        keyboardShouldPersistTaps="always"
        automaticallyAdjustKeyboardInsets={true}
      >
        <View
          style={{
            height: "30%",
            backgroundColor: "#375474",
            width: "80%",
            flexDirection: "row",
            marginTop: "2%",
            borderRadius: 20,
            padding: 5
          }}
        >
          <View
            style={[
              styles.empShiftsContainer,
              {
                width: "50%",
                paddingTop: 10,
                justifyContent: "space-around",
                alignItems: "flex-start",
                paddingLeft: 5
              }
            ]}
          >
            <Text style={styles.empText}>EXHIBIT NAME:</Text>
            <Text style={styles.empText}>EXHIBIT ID:</Text>
            <Text style={styles.empText}>DATE ISSUED:</Text>
            <Text style={styles.empText}>STATUS:</Text>
            <Text style={styles.empText}>PRIORITY:</Text>
            <Text style={styles.empText}>EMP NAME:</Text>

          </View>
          {/* <View style={{ borderWidth: 1, borderColor: "white" }}></View> */}
          <View
            style={[
              styles.empShiftsContainer,
              {
                width: "50%",
                paddingTop: 10,
                justifyContent: "space-around",
                alignItems: "flex-start",
                paddingLeft: 5
              }
            ]}
          >
            {allExhibitData?
            <>
            <Text style={styles.empText}>{exbName?exbName:"Science"}</Text>
            <Text style={styles.empText}>{exbId?exbId:"0"}</Text>
            <Text style={styles.empText}>{exbDate?exbDate:"00-00-0000"}</Text>
            <Text style={styles.empText}>{exbStatus?exbStatus:"High"}</Text>
            <Text style={styles.empText}>{exbPriority?exbPriority:"Exhibit power failure"}</Text>
            <Text style={styles.empText}>{exbempName?exbempName:"Employee"}</Text>
            </>
            :
            null
            }
          </View>
        </View>

<View style={{flexDirection:"row", margin:5,alignItems:"center", justifyContent:"center"}}>
  <TouchableOpacity onPress={()=>leftClickMove()}>
    <Icon name="chevron-back-outline" size={40} color="#fff" style={{paddingRight:10}}/>
  </TouchableOpacity>
  <TouchableOpacity onPress={()=>rightClickMove()}>
    <Icon name="chevron-forward-outline" size={40} color="#fff"  style={{paddingLeft:10}} />
  </TouchableOpacity>
</View>
        <View
          style={{
            height: "50%",
            backgroundColor: "#375474",
            width: "100%",
            top: "3%",
            padding: 10,
            borderRadius: 20
          }}
          onStartShouldSetResponder={() => {
            Keyboard.dismiss();
          }}
        >
          <Text style={styles.textStyle((font = 15))}>SEND TECHNICIAN</Text>
          <View
            style={{
              marginTop: "3%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around"
            }}
          >
            <Text style={styles.empText}>Science Exhibit</Text>
            <Picker
              style={{
                backgroundColor: "#fff",
                borderRadius: 20,
                color: "#000",
                width: "50%",
                fontWeight: "500"
              }}
              testID="basic-picker"
              selectedValue={employeName}
              onValueChange={(v) => setEmployeName(v)}
              accessibilityLabel="Basic Picker Accessibility Label"
              itemStyle={{ color: "black", fontSize: 15, height: 50 }}
            >
              {techId?.map((item, index) => (
                <Picker.Item
                  label={"ID:" + item.id}
                  value={item.id}
                  key={index}
                />
              ))}
            </Picker>
          </View>

          <View
            style={{
              marginTop: "3%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly"
            }}
          >
            <Text style={styles.empText}>Technician Name</Text>
            <Picker
              style={{
                backgroundColor: "#fff",
                borderRadius: 20,
                color: "#000",
                width: "50%"
              }}
              testID="basic-picker"
              selectedValue={employeName}
              onValueChange={(v) => setEmployeName(v)}
              accessibilityLabel="Basic Picker Accessibility Label"
              itemStyle={{ color: "black", fontSize: 15, height: 50 }}
            >
              {techName?.map((item, index) => (
                <Picker.Item label={item.label} value={item.id} key={index} />
              ))}
            </Picker>
          </View>

          {/* <KeyboardAvoidingView style={{ flex: 1 }}  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}> */}
          <View
            style={{
              marginTop: "1%",
              backgroundColor: "#375474",
              // width:"100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
              height: 60
              // backgroundColor:"white"
            }}
          >
            <Text style={styles.empText}>Work Details</Text>

            
            <View
              style={{
                height: "100%",
                backgroundColor: "#333",
                width: "50%",
                flexDirection: "row",
                // marginTop: 5,
                borderRadius: 20
                // padding: 5
              }}
              onStartShouldSetResponder={() => {
                Keyboard.dismiss();
              }}
            >
              <TextInput
                placeholder="Comment"
                style={{
                  backgroundColor: "#333",
                  // width: "100%",
                  height: "100%",
                  // alignSelf: "flex-start",
                  // justifyContent: "center",
                  textAlignVertical: "top",
                  padding: 7,
                  color: "#fff",
                  borderRadius:20,
                  flex: 1,
                  flexWrap: "wrap"
                }}
                multiline
                scrollEnabled
                placeholderTextColor={"white"}
              />
            </View>
          </View>
          {/* </KeyboardAvoidingView> */}
        <TouchableOpacity style={{ marginTop:20}}>
          <Text
            style={{
              textAlign: "center",
              fontWeight: "600",
              fontSize: 20,
              color: "#079DDF",
              letterSpacing: 2
            }}
          >
            Send Technical
          </Text>
        </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
};

export default ExhibitsIssues;

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
    // width: "50%",
    // height: "100%",
    // alignItems: "center"
  },
  // saveButtonStyle: {
  //   backgroundColor: "#079DDF",
  //   // padding: 10,
  //   // width: "20%",
  //   borderRadius: 10,
  //   alignItems: "center",
  //   justifyContent:"center"
  // }
  // ,
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

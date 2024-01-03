import {
  Alert,
  Image,
  ImageBackground,
  Keyboard,
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
import { useNavigation, useRoute,useIsFocused } from "@react-navigation/native";
import Checkbox from "expo-checkbox";
import * as ImagePicker from "expo-image-picker";
import DailyShiftsComponents from "../components/DailyShiftsComponents";
import * as SQLite from "expo-sqlite";

import AsyncStorage from "@react-native-async-storage/async-storage";

const HireDates = [
  {
    id: 1,
    label: "12/11/2023"
  },
  {
    id: 2,
    label: "13/11/2023"
  },
  {
    id: 3,
    label: "14/11/2023"
  },
  {
    id: 4,
    label: "15/11/2023"
  },
  {
    id: 5,
    label: "16/11/2023"
  },
  {
    id: 6,
    label: "17/11/2023"
  },
  {
    id: 7,
    label: "18/11/2023"
  },
  {
    id: 8,
    label: "19/11/2023"
  },
  {
    id: 9,
    label: "20/11/2023"
  },
  {
    id: 10,
    label: "21/11/2023"
  },
  {
    id: 11,
    label: "22/12/2023"
  },
  {
    id: 12,
    label: "13/12/2023"
  },
  {
    id: 13,
    label: "14/12/2023"
  },
  {
    id: 14,
    label: "12/12/2023"
  }
];

const statusData = [
  {
    id: 1,
    label: "High"
  },
  {
    id: 2,
    label: "Medium"
  },
  {
    id: 3,
    label: "Low"
  }
];

const prorityData = [
  {
    id: 1,
    label: "Exhibit power failure"
  },
  {
    id: 2,
    label: "Exhibit projector failure"
  },
  {
    id: 3,
    label: "Exhibit light failure"
  },
  {
    id: 4,
    label: "Exhibit sound failure"
  },
  {
    id: 5,
    label: "Exhibit screen failure"
  }
];

const EmpQrCode = () => {
  // const data=useSelector(state=>state.employees);
  const data = useSelector((state) => state.employees);
  const [isChecked, setIsChecked] = useState(true);

  const [statusIssues, setStatusIssues] = useState("");
  const [priorityIssues, setPriorityIssues] = useState("");
  const [issueDates, setIssueDates] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [des, setDes] = useState("");
  
  let newNames = [];
  const [nameData, setNameData] = useState([]);
  const[exhibitNamesId, setExhibitNamesId] = useState("")


  //   console.log(data.employeeLogin[0].name);
  const dispatch = useDispatch();

  const navigation = useNavigation();
  const route = useRoute();
  const { qrData } = route.params;
  const { imageData } = route.params;

  const [image, setImage] = useState(imageData ? imageData : null);
  // console.log("qr routes", qrData);
  
  const [db, setDb] = useState(SQLite.openDatabase("example.db"));

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleYesPress = () => {
    setIsChecked(true);
  };

  const handleNoPress = () => {
    setIsVisible(false);
    setIsChecked(false);
    // alert("hello")
  };

  const savemyexibitwork = () => {
    console.log("arrry bhai", data?.employeeLogin[0]?.employee_id,exhibitNamesId-1,HireDates[issueDates-1].label,statusData[statusIssues-1].label,prorityData[priorityIssues-1].label,des);
    if (!isChecked) {
      if (priorityIssues && statusIssues && issueDates && des && exhibitNamesId) {
        console.log("in hu bhai");
        db.transaction((tx) => {
          // console.log("andr hu ");
          // Assuming data is fetched asynchronously and other arrays are populated
          const employeeName = data?.employeeLogin[0]?.employee_id;
          const exhibitId = exhibitNamesId;
          const issueDate = HireDates[issueDates - 1].label;
          const status = statusData[statusIssues - 1].label;
          const priority = prorityData[priorityIssues - 1].label;
          const issueDetails = des;
        
          tx.executeSql(
            "INSERT INTO EXHIBIT_ISSUES (employee_id,exhibit_id,issue_date,status,priority,issue_details) values (?,?,?,?,?,?)",
            [employeeName, exhibitId, issueDate, status, priority, issueDetails],
            (_, result) => {
              // console.log("tuuuuuuuuu");
              // console.log("Data inserted successfully:", result);
              Alert.alert('Success', 'Exhibit Issue saved successfully');
              setDes(""),
              setIsChecked(true)
            },
            (_, error) => {
              console.error("Error inserting data:", error);
            }
          );
        });
        // console.log("you are good to go");
      } else {
        alert("Please fill all the fields");
      }
      // console.log("ok true");
      // setIsVisible(true);
    } else {
      alert("Please Select Issue");
    }
  };

  const isFocused = useIsFocused();

  useEffect(()=>{
    if(isFocused){
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
      })()}
  },[isFocused])



  return (
    <View style={{ flex: 1, backgroundColor: "#002F65" }}>
      <View style={{ backgroundColor: "#079DDF", padding: 10 }}>
        <Text style={{ fontSize: 25, color: "#fff" }}>Hello, {data && data?.employeeLogin[0]?.name} </Text>
      </View>
      <Text style={styles.buttonText}>Scan The Qr Code</Text>
      <ScrollView
        style={{ flex: 1, padding: 10 }}
        onStartShouldSetResponder={() => Keyboard.dismiss()}
      >
        <View style={{ marginVertical: 5 }}>
          <Text style={{ fontSize: 20, color: "#fff", textAlign: "center" }}>
            EXHIBIT WORKS?
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly"
              //   marginVertical: 10,
            }}
          >
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center" }}
              onPress={handleYesPress}
            >
              <Checkbox
                style={{
                  margin: 5,
                  backgroundColor: "white",
                  borderColor: "blue",
                  borderRadius: 100
                }}
                value={isChecked}
              />
              <Text
                style={{ fontSize: 15, color: "white", textAlign: "center" }}
              >
                Yes
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center" }}
              onPress={handleNoPress}
            >
              <Checkbox
                style={{
                  margin: 5,
                  backgroundColor: "white",
                  borderColor: "blue",
                  borderRadius: 100
                }}
                value={!isChecked}
              />
              <Text
                style={{ fontSize: 20, color: "white", textAlign: "center" }}
              >
                No
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            backgroundColor: "#355274",
            marginVertical: 10,
            padding: 10,
            borderRadius: 10
          }}
        >
          <Text style={{ color: "white", fontSize: 20, marginBottom: 10 }}>
            REPORT ISSUES
          </Text>
          <TextInput
            placeholder="Type Here"
            onChangeText={(text) => setDes(text)}
            defaultValue={des}
            style={{
              backgroundColor: "#355274",
              width: "100%",
              height: 100,
              //   padding: 10,
              color: "#fff",
              //   borderRadius: 5,
              textAlignVertical: "top"
            }}
            multiline
            placeholderTextColor="white"
          />
        </View>

        <View
          style={{
            backgroundColor: "#fff",
            marginVertical: 10,
            padding: 10,
            borderRadius: 10
          }}
        >
          <Text style={{ color: "#355274", fontSize: 20, marginBottom: 10 }}>
            DROP A PHOTO
          </Text>
          {/* <View style={{width:"100%", height:"100%", backgroundColor:"white"}}> */}
          <TouchableOpacity onPress={() => pickImage()}>
            <Image
              source={
                image ? { uri: image } : require(".././assets/images/drop.png")
              }
              style={{
                width: "100%",
                height: 120,
                alignSelf: "center",
                resizeMode: "cover"
              }}
            />
          </TouchableOpacity>
          {/* </View> */}
        </View>
        <View style={{ marginVertical: 10, margin: 10 }}>
          <TouchableOpacity
            style={{ margin: 5, backgroundColor: "#355274" }}
            onPress={() => savemyexibitwork()}
          >
            <Text
              style={{
                color: "white",
                fontSize: 20,
                textAlign: "center",
                padding: 10
              }}
            >
              SAVE
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ margin: 5, backgroundColor: "#355274" }}
            onPress={() => navigation.navigate("EmpCamera")}
          >
            <Text
              style={{
                color: "white",
                fontSize: 20,
                textAlign: "center",
                padding: 10
              }}
            >
              SCAN AGAIN
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ margin: 5, backgroundColor: "#355274" }}
            onPress={() => navigation.navigate("EmpHomeScreen")}
          >
            <Text
              style={{
                color: "white",
                fontSize: 20,
                textAlign: "center",
                padding: 10
              }}
            >
              EXIT
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* model for data stort */}
      {!isVisible && (
        <View
          style={{
            height: "50%",
            // flex:1,
            width: "90%",
            // backgroundColor: "red",
            justifyContent: "center",
            alignSelf: "center",
            position: "absolute",
            // bottom: 10
            borderRadius: 10,
            top: 150
          }}
        >
          <View
            style={{ backgroundColor: "#079DDF", borderRadius: 20, padding: 6 }}
          >
            <DailyShiftsComponents
              identifier={"exhibitDatainIssues"}
              labelText={"Exhibit Name"}
              mapData={nameData}
              setExhibitNamesId={setExhibitNamesId}
              margin={0}
            />
            <DailyShiftsComponents
              identifier={"issueDateinIssues"}
              labelText={"Issue Dates"}
              mapData={HireDates}
              setIssueDates={setIssueDates}
              margin={0}
            />
            <DailyShiftsComponents
              identifier="statusInIssues"
              labelText="Status"
              setStatusIssues={setStatusIssues}
              mapData={statusData}
              margin={0}
            />

            <DailyShiftsComponents
              identifier="priorityInIssues"
              labelText="Priority"
              setPriorityIssues={setPriorityIssues}
              mapData={prorityData}
              margin={0}
            />

            <TouchableOpacity
              onPress={() => {
                // navigation.navigate('EmployeeList')
                // saveEmployeesData();
                // saveMyData();
                if (priorityIssues && statusIssues && issueDates) {
                  // setIsChecked(true)
                  setIsVisible(true);
                  console.log("ok fasle");
                } else {
                  alert("Please fill all the fields");
                }
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
                  fontWeight: "400"
                }}
              >
                Add
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};
export default EmpQrCode;

const styles = StyleSheet.create({
  button: {
    height: "28%",
    backgroundColor: "#002F65",
    width: "60%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    margin: 10 // Adjust the margin based on your preference
  },
  buttonText: {
    color: "white",
    top: 6,
    fontWeight: "500",
    letterSpacing: 2,
    fontSize: 20,
    paddingLeft: 10
  }
});

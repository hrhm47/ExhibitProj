import {
  Alert,
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
import { useSelector, useDispatch } from "react-redux";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SQLite from "expo-sqlite";



const Exhibits = () => {
  const [exhibitName, setExhibitName] = useState("");
  const [exhibitId, setExhibitId] = useState("");
  const [exhibitType, setExhibitType] = useState("");
  const [exhibitLocation, setExhibitLocation] = useState("");
  const [exhibitDescription, setExhibitDescription] = useState("");
  const [nameData, setNameData] = useState([]);
  const [exhibitTypeData, setExhibitTypeData] = useState([]);
  const [exhibitLocData, setExhibitLocData] = useState([]);
  const [db, setDb] = useState(SQLite.openDatabase('example.db'));
  // const [openCalender, setOpenCalender] = useState(false);

  const isFoucused = useIsFocused();

  const navigation = useNavigation();

  const data = useSelector((state) => state?.employees);



  let newNames = [];
  let newExhibitTypes = [];
  const newExhibitLocs = [];
  useEffect(() => {
    
    console.log("heeeeeee");
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
            newExhibitTypes.push({
              id: index,
              label: item.exhibitType
            });
            newExhibitLocs.push({
              id: index,
              label: item.exhibitLocation
            });
          });
        }
        setNameData(newNames);
          setExhibitTypeData(newExhibitTypes);
          setExhibitLocData(newExhibitLocs);
      } catch (error) {
        console.error("Error retrieving and parsing exhibit data:", error);
        // Handle the error as needed
      }
    })();
  }, [isFoucused]);


  const saveMyData=()=>{
    try {
      if (exhibitName && exhibitType && exhibitLocation && exhibitDescription) {
        db.transaction((tx) => {
          tx.executeSql(
            "INSERT INTO EXHIBIT (name, description, type, location) values (?,?,?,?)",
            [nameData[exhibitName].label,exhibitDescription,exhibitType,exhibitLocation],
            (_, result) => {
              // console.log("Inserting Result:", result);
              Alert.alert("Exhibit Added Successfully")
              // Alert.alert("Welcome to Scientific Lab")
            },
            (_, error) => {
              console.error("Error executing insert query:", error);
            }
          );
        });
      }
    
      else{
        alert("Please fill all the fields")
      }
      
    } catch (error) {
      
    }
  }




  // console.log("name data", nameData);
  // console.log("exibit data: ",data.employeeLogin?data.employeeLogin:" admin");
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
          Hello,
          {data?.employeeLogin ? data?.employeeLogin[0]?.name : " admin"}
        </Text>
        <TouchableOpacity style={{marginRight:70,}}
          onPress={() => {
            navigation.navigate("CreateExhibits");
          }}
        >
          <Icon name="plus-circle" size={30} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.tagView}>
        <Text style={styles.textStyle((font = 25))}>Exhibit</Text>
      </View>
      <ScrollView
        style={{}}
        contentContainerStyle={{ height: "100%", alignItems: "center" }}
        keyboardShouldPersistTaps="always"
        keyboardDismissMode="interactive"
        automaticallyAdjustKeyboardInsets={true}
      >
        <View
          style={styles.selectionView}
          onStartShouldSetResponder={() => {
            Keyboard.dismiss();
          }}
        >
          <View style={styles.empShiftsContainer}>
            {/* EMPLOYE NAME */}
            <DailyShiftsComponents
              identifier="ExhibitName"
              labelText="EXHIBIT NAME"
              mapData={nameData}
              setExhibitName={setExhibitName}
              margin={0}
            />

            {/* EXHIBIT ID */}
            <DailyShiftsComponents
              identifier="EXHIBIT ID"
              labelText={"EXHIBIT ID"}
              identifierLabel={exhibitName?nameData[exhibitName].id:"0"}

              // mapData={nameData}
              margin={0}
            />

            {/* Shift Type */}
            <DailyShiftsComponents
              identifier="exhibitType"
              labelText="EXHIBIT TYPE"
              mapData={exhibitTypeData}
              setExhibitType={setExhibitType}
              margin={0}
            />
            <DailyShiftsComponents
              identifier="Location"
              labelText="LOCATION"
              setExhibitLocation={setExhibitLocation}
              mapData={exhibitLocData}
              margin={0}
            />
          </View>
        </View>

        <View
          style={{
            height: "35%",
            backgroundColor: "#355274",
            width: "75%",
            flexDirection: "row",
            marginTop: 5,
            borderRadius: 20,
            padding: 5
          }}
          onStartShouldSetResponder={() => {
            Keyboard.dismiss();
          }}
        >
          <TextInput
            placeholder="Type Here"
            style={{
              backgroundColor: "#355274",
              width: "100%",
              height: "70%",
              alignSelf: "flex-start",
              justifyContent: "center",
              textAlignVertical: "top",
              padding: 10,
              color: "#fff",
              flex: 1,
              flexWrap: "wrap"
            }}
            multiline
            scrollEnabled
            placeholderTextColor={"white"}
            onChangeText={(text) => setExhibitDescription(text)}
            defaultValue={exhibitDescription}
          />
        </View>
      </ScrollView>

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
              // navigation.navigate('EmployeeList')
              // saveEmployeesData();
              saveMyData()
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
    </View>
  );
};

export default Exhibits;

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
    alignItems: "flex-start",
    width: "100%",
    paddingLeft: 15,
    paddingTop: 15
  },
  selectionView: {
    // height: "45%",
    // backgroundColor: "green",
    // alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%"
    // top:"3%"
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
  })
});

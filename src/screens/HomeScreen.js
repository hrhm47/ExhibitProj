import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import {useNavigation} from '@react-navigation/native'
import { useSelector,useDispatch } from "react-redux";
// import { SQLiteDatabase } from "expo-sqlite";

// import camera from '../assets/images'
// import camera from '../assets/images'
const ButtonsData = [
  {
    id: 1,
    btnName: "Camera",
    btnIcon: require("../assets/images/camera.png"),
    btnScreen:'Camera'
  },
  {
    id: 2,
    btnName: "Exhibits",
    btnIcon: require("../assets/images/server.png"),
    btnScreen:'Exhibits'
  },
  {
    id: 3,
    btnName: "Employess Information",
    btnIcon: require("../assets/images/employees.png"),
    btnScreen:'Employess'
  },
  {
    id: 4,
    btnName: "Exhibit Issues",
    btnIcon: require("../assets/images/issues.png"),
    btnScreen:'ExhibitsIssues'
  },
  {
    id: 5,
    btnName: "Shifts",
    btnIcon: require("../assets/images/shits.png"),
    btnScreen:'DailyShifts'
  },
  {
    id: 6,
    btnName: "Reports",
    btnIcon: require("../assets/images/report.png"),
    btnScreen:"Reports"
  }
];

const HomeScreen = () => {

  const data=useSelector(state=>state?.employees);
  // console.log(data?.employeeLogin[0]?.name);
  // console.log("data.setEmployeeLogin");
  const dispatch=useDispatch()

  

    const navigation=useNavigation()

// const db=SQLiteDatabase.da







  return (
    <View style={{ height: "100%", alignItems: "center" }}>
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
        <Text style={{ fontSize: 25 }}>Hello,
        {data.employeeLogin? data?.employeeLogin[0]?.name:"admin"}
        </Text>
        <TouchableOpacity onPress={()=>navigation.navigate('AdminSettings')}>
          <Icon name="user" size={40} color={"white"} />
        </TouchableOpacity>
      </View>


      <View style={{ alignItems: "center",width:"100%" }}>
        {/* for text input */}
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "green",
            paddingLeft:10,
            paddingRight:10,
            width: "60%"
          }}
        >
          <TextInput placeholder="Search" />
          <Icon name="search" size={20} color={"black"} />
        </TouchableOpacity>
      </View>

      <View
        style={{
          height: "100%",
          padding: 20,
          // alignItems: "center",
          paddingTop: 10,
          // width: "80%",
          // backgroundColor: "black",
          flexDirection: "row",
          flex: 1,
          flexWrap: "wrap"
        }}
      >
        <View
          //   key={item.id}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            flexWrap: "wrap"
          }}
        >
          {ButtonsData.map((item, index) => (
            <TouchableOpacity style={styles.button} id={item.id}
                onPress={()=>navigation.navigate(item.btnScreen)}
            >
              <Image
                source={item.btnIcon}
                style={{
                  width: "30%",
                  height: "30%",
                  resizeMode: "contain",
                  paddingBottom: 10,
                  tintColor: "white"
                }}
              />
              <Text style={styles.buttonText}>{item?.btnName}</Text>
            </TouchableOpacity>
            //   {/* Add another TouchableOpacity here if you want two boxes side by side */}
          ))}
        </View>
      </View>
      
      <View
        style={{ height: "8%", width: "100%", backgroundColor: "#079DDF", justifyContent:"center", alignItems:"center" }}
      >
        <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
          <Icon name="home" size={30} color={"white"} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  button: {
    // height: "20%",
    backgroundColor: "#002F65",
    width: "40%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    margin: 10 // Adjust the margin based on your preference
  },
  buttonText: {
    color: "white",
    top: 6,
    fontWeight: "500",
    letterSpacing: 2
  }
});

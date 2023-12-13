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
  
  // import camera from '../assets/images'
  // import camera from '../assets/images'
  const ButtonsData = [
    {
      id: 1,
      btnName: "Camera",
      btnIcon: require("../assets/images/camera.png"),
      btnScreen:'EmpCamera'
    },
    {
      id: 2,
      btnName: "Attendance",
      btnIcon: require("../assets/images/attendance.png"),
      btnScreen:'EmpAttendance'
    },
    {
      id: 3,
      btnName: "Shifts",
      btnIcon: require("../assets/images/shits.png"),
      btnScreen:'EmpShifts'
    },
  ];
  
  const EmpHomeScreen = () => {
  
    const data=useSelector(state=>state.employees);
    console.log(data?.employeeLogin[0]?.employee_id);
    const dispatch=useDispatch()
  
  
  
      const navigation=useNavigation()
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
          <Text style={{ fontSize: 25 }}>Hello, {data?.employeeLogin[0]?.name}</Text>
          {/* <TouchableOpacity onPress={()=>navigation.navigate('AdminSettings')}>
            <Icon name="user" size={40} color={"white"} />
          </TouchableOpacity> */}
        </View>
  
  
        <View
          style={{
            height: "100%",
            padding: 20,
            width:"80%",
            alignItems: "center",
            paddingTop: 10,
            flex: 1,
          }}
        >
          <View
            style={{
                width:"100%",
                alignItems:"center",
              justifyContent: "space-between",
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
                <Text style={styles.buttonText}>{item.btnName}</Text>
              </TouchableOpacity>
              //   {/* Add another TouchableOpacity here if you want two boxes side by side */}
            ))}
          </View>
        </View>
      
        <View
          style={{ height: "8%", width: "100%", backgroundColor: "#079DDF", justifyContent:"center", alignItems:"center" }}
        >
          <TouchableOpacity onPress={()=> navigation.navigate('Login')}>
            <Icon name="home" size={30} color={"white"} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  
  export default EmpHomeScreen;
  
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
      letterSpacing: 2
    }
  });
  
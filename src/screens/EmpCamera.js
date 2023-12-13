import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import React, { useState,useEffect } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { Camera, CameraType } from "expo-camera";

const EmpCamera = () => {
  const data = useSelector((state) => state.employees);
//   console.log(data.employeeLogin[0].name);
  const dispatch = useDispatch();

  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [openCamera, setOpenCamera] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [iconChanged, setIconChanged] = useState(false);


  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      setImage(data.uri);
      navigation.navigate('EmpQrCode',{
        imageData:data.uri
      })
    }
  };
  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  useEffect(() => {
    (async () => {
      Camera.requestCameraPermissionsAsync()
        .then((res) => {
          res.granted === true
            ? console.log("granted")
            : console.log("not granted");
        })
        .catch((err) => {
          console.log("error", err);
        });
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {

    setScanned(true);
    console.log("on click scanned");
    navigation.navigate('EmpQrCode',{
        qrData:data
    })
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };
  const navigation = useNavigation();
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
        <Text style={{ fontSize: 25 }}>
          Hello,
           {/* {data.employeeLogin[0].name} */}
        </Text>
        {/* <TouchableOpacity onPress={() => navigation.navigate("AdminSettings")}>
          <Icon name="user" size={40} color={"white"} />
        </TouchableOpacity> */}
      </View>

      <View
        style={{
          height: "100%",
          padding: 20,
          width: "100%",
          alignItems: "center",
          paddingTop: 10,
          // width: "80%",
          // backgroundColor: "black",
          // flexDirection: "row",
          flex: 1
          // flexWrap: "wrap"
        }}
      >
        <Text style={styles.buttonText}>Scan The Qr Code</Text>
        <View
          style={{
            borderWidth: 2,
            borderColor: "black",
            width: "100%",
            marginTop: "2%"
          }}
        ></View>
        <View
          style={{  height: "100%", width: "100%" }}
        >
          <Camera
                ref={(ref) => setCamera(ref)}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 75, // Set half of the width or height to create a circle
                //   overflow: "hidden", // Ensure the camera view stays within the circular boundary
                  justifyContent: "center"
                }}
                type={type}
                ratio={"1:1"}
                onBarCodeScanned={!iconChanged?scanned ?undefined : handleBarCodeScanned:undefined}
              >
                <TouchableOpacity onPress={()=>{takePicture()}}>
                    <Text style={{color:"green", alignSelf:"center", fontSize:30, fontWeight:"600"}}>For Photo Capture Click Text</Text>
                </TouchableOpacity>


              </Camera>
          {scanned && (
            <TouchableOpacity onPress={() => setScanned(false)}>
              <Text>Tap to Scan Again</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View
        style={{
          height: "10%",
          width: "100%",
          backgroundColor: "#079DDF",
          justifyContent: "center",
          alignItems: "center"
        }}
      >

        {iconChanged?
        <TouchableOpacity onPress={()=>{setIconChanged(iconChanged=>!iconChanged)}  }>
            <Icon name="camera" size={50} color={"white"} />
            
        </TouchableOpacity>:
        <TouchableOpacity onPress={()=>setIconChanged(iconChanged=>!iconChanged)}>
            
          <Icon name="qrcode" size={50} color={"white"} />
        </TouchableOpacity>
        }
      </View>
    </View>
  );
};

export default EmpCamera;

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
    color: "black",
    top: 6,
    fontWeight: "500",
    letterSpacing: 2,
    fontSize: 40
  }
});

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import TextInputField from "../components/TextInputField";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ExhibitsCreation = () => {
  const [exhibitName, setExhibitName] = useState("");
  const [exhibitType, setExhibitType] = useState("");
  const [exhibitLocation, setExhibitLocation] = useState("");

  const navigation = useNavigation();

  const data = useSelector((state) => state?.employees);

  useEffect(() => {}, []);

  const saveExhibit = async () => {
    console.log("exhibitName", exhibitName);
    if (exhibitName && exhibitType && exhibitLocation) {
        console.log("inisde if");
      (async () => {
        try {
          const value = await AsyncStorage.getItem("exbibitData");
            // console.log("value", value);
            const saveExhibitData = {
              exhibitName: exhibitName,
              exhibitType: exhibitType,
              exhibitLocation: exhibitLocation
            };
          if (value) {
            let data = [];
            try {
              data = JSON.parse(value);
            } catch (error) {
              console.error("Error parsing stored data:", error);
            }
            console.log("Here is the get item data", data);
            if (!Array.isArray(data)) {
              data = [];
            }
            // Use a flag to track if the exhibit already exists
            let exhibitExists = false;
            // Check if the exhibit already exists in the data array
            data?.forEach((item) => {
              if (
                item.exhibitName === exhibitName &&
                item.exhibitType === exhibitType &&
                item.exhibitLocation === exhibitLocation
              ) {
                exhibitExists = true;
                return;
              }
            });
            if (exhibitExists) {
              alert("Exhibit already exists");
            } else {
                console.log("arrry yr kaha hu");
              // If exhibit does not exist, add it to the data array
              data.push(saveExhibitData);
              await AsyncStorage.setItem("exbibitData", JSON.stringify(data));
              alert("Exhibit Added Successfully");
              // navigation.navigate("Exhibits");
            }
        }
            else{
                console.log("arrry yr kaha hu");
              // If exhibit does not exist, add it to the data array
            //   data.push(saveExhibitData);
              await AsyncStorage.setItem("exbibitData", JSON.stringify(saveExhibitData));
              alert("Exhibit Added Successfully");
            }
          
        } catch (error) {
          console.error("Error accessing or storing exhibit data:", error);
          alert("There was an error with your data");
        }
      })();
    } else {
      alert("Please fill all the fields");
    }
  };

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
          Hello,{" "}
          {data?.employeeLogin != null ? data?.employeeLogin[0]?.name : "admin"}
        </Text>
      </View>

      <View style={styles.tagView}>
        <Text
          style={[
            styles.textStyle((font = 25)),
            { textAlign: "center", alignSelf: "center" }
          ]}
        >
          Add Exhibits
        </Text>
      </View>

      <TextInputField
        identifier="exhibitName"
        text="Exhibit Name"
        placeholder={"Enter Exhibit Name"}
        setExhibitName={setExhibitName}
      />
      <TextInputField
        identifier="exhibitType"
        text="Exhibit Type"
        placeholder={"Enter Exhibit Type"}
        setExhibitType={setExhibitType}
      />
      <TextInputField
        identifier="exhibitLocation"
        text="Exhibit Location"
        placeholder={"Enter Exhibit Location"}
        setExhibitLocation={setExhibitLocation}
      />

      <TouchableOpacity
        style={{
          width: "50%",
          backgroundColor: "#079DDF",
          height: "7%",
          alignItems: "center",
          margin: 20,
          borderRadius: 10,
          justifyContent: "center"
        }}
        onPress={() => saveExhibit()}
      >
        <View>
          <Text style={{ fontSize: 25, fontWeight: "600", letterSpacing: 1 }}>
            Add
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ExhibitsCreation;

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

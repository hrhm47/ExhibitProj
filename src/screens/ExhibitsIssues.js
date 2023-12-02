import {
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { Picker } from "@react-native-picker/picker";
import DailyShiftsComponents from "../components/DailyShiftsComponents";
// import * as Calendar from 'expo-calendar';
import { Calendar, Agenda } from "react-native-calendars";

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

const DailyShifts = () => {
  const [employeName, setEmployeName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [shiftType, setShitType] = useState("");
  const [openCalender, setOpenCalender] = useState(false);
  return (
    <View
      style={{
        height: "100%",
        alignItems: "center",
        backgroundColor: "#002F65"
      }}
    >
      <View style={styles.headerView}>
        <Text style={{ fontSize: 25 }}>Hello, Jhon Doe</Text>
      </View>

      <View style={styles.tagView}>
        <Text style={styles.textStyle((font = 25))}>Exhibit Issues</Text>
      </View>

      <View
        style={{
          height: "30%",
          backgroundColor: "#375474",
          width: "80%",
          flexDirection: "row",
          marginTop: 5,
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
          <Text style={styles.empText}>Science Exhibit</Text>
          <Text style={styles.empText}>3</Text>
          <Text style={styles.empText}>6-10-2023</Text>
          <Text style={styles.empText}>High</Text>
          <Text style={styles.empText}>Exhibit power failure</Text>
        </View>
      </View>

      <View
        style={{
          height: "40%",
          backgroundColor: "#375474",
          width: "80%",
          top:"3%",
          padding: 10,
          borderRadius:20
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
              fontWeight:"500"
            }}
            testID="basic-picker"
            selectedValue={employeName}
            onValueChange={(v) => setEmployeName(v)}
            accessibilityLabel="Basic Picker Accessibility Label"
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
          >
            {techName?.map((item, index) => (
              <Picker.Item label={item.label} value={item.id} key={index} />
            ))}
          </Picker>
        </View>
        <View
          style={{
            marginTop: "3%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
            height: "30%"
            // backgroundColor:"white"
          }}
        >
          <Text style={styles.empText}>Technician Name</Text>

          {/* text component */}
          <View
            style={{
              height: "80%",
              backgroundColor: "#333",
              width: "50%",
              flexDirection: "row",
              // marginTop: 5,
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
                backgroundColor: "#333",
                width: "100%",
                height: "80%",
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
            />
          </View>
        </View>

      </View>
        <TouchableOpacity style={{}}>
          <Text
            style={{
              textAlign: "center",
              fontWeight: "600",
              fontSize: 15,
              color: "blue",
              letterSpacing: 2
            }}
          >
            Send Technical
          </Text>
        </TouchableOpacity>
    </View>
  );
};

export default DailyShifts;

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
    width: "50%",
    height: "100%",
    alignItems: "center"
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

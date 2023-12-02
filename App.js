// import { StatusBar } from 'expo-status-bar';











/*
button + calender working



*/

import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import WelcomeScreen from "./src/screens/WelcomeScreen";
import LoginScreen from "./src/screens/LoginScreen";
import HomeScreen from "./src/screens/HomeScreen";
import DailyShifts from "./src/screens/DailyShits";
import Employess from "./src/screens/Employess";
import Exhibits from "./src/screens/Exhibits";
import Reports from "./src/screens/Reports";
import Camera from "./src/screens/Camera";
import ExhibitsIssues from "./src/screens/ExhibitsIssues";



const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <SafeAreaView style={styles.andriodSafeArea}>
        {/* <View style={styles.container}> */}
        {/* <WelcomeScreen/> */}
        {/* <LoginScreen/> */}
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Welcome"
            screenOptions={{ headerShown: false }}
          >
            {/* <Stack.Screen name="Welcome" component={WelcomeScreen} /> */}
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="DailyShifts" component={DailyShifts} />
            <Stack.Screen name="Employess" component={Employess} />
            <Stack.Screen name="Exhibits" component={Exhibits} />
            <Stack.Screen name="ExhibitsIssues" component={ExhibitsIssues} />
            <Stack.Screen name="Camera" component={Camera} />
            <Stack.Screen name="Reports" component={Reports} />
            
          </Stack.Navigator>
        </NavigationContainer>
        <StatusBar barStyle="default" />
    {/* </View> */}
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
  },
  andriodSafeArea: {
    backgroundColor: "#00073D",
    height: "100%"
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    // height: "100%"
  }
});

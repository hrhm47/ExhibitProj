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
import AdminSettings from "./src/screens/AdminSettings";

import { Provider } from "react-redux";
import store from "./src/app/store/store";
import EmpHomeScreen from "./src/screens/EmpHomeScreen";
import EmpCamera from "./src/screens/EmpCamera";
import EmpQrCode from "./src/screens/EmpQrCode";
import EmpAttendance from "./src/screens/EmpAttendance";
import EmpShifts from "./src/screens/EmpShifts";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <SafeAreaView style={styles.andriodSafeArea}>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Welcome"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="DailyShifts" component={DailyShifts} />
            <Stack.Screen name="Employess" component={Employess} />
            <Stack.Screen name="Exhibits" component={Exhibits} />
            <Stack.Screen name="ExhibitsIssues" component={ExhibitsIssues} />
            <Stack.Screen name="Camera" component={Camera} />
            <Stack.Screen name="Reports" component={Reports} />
            <Stack.Screen name="AdminSettings" component={AdminSettings} />
            <Stack.Screen name="EmpHomeScreen" component={EmpHomeScreen} />
            <Stack.Screen name="EmpCamera" component={EmpCamera} />
            <Stack.Screen name="EmpQrCode" component={EmpQrCode} />
            <Stack.Screen name="EmpAttendance" component={EmpAttendance} />
            <Stack.Screen name="EmpShifts" component={EmpShifts} />
          </Stack.Navigator>
        </NavigationContainer>
        <StatusBar barStyle="default" />
      </Provider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {},
  andriodSafeArea: {
    backgroundColor: "#00073D",
    height: "100%"
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    // height: "100%"
  }
});

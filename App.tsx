import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-native-paper";
import Home from "./src/pages/Home";
import Profile from "./src/pages/Profile";
import Login from "./src/pages/Login";
import theme from "./src/config/theme";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <Provider theme={theme}>
      <NavigationContainer>
        <Login />
      </NavigationContainer>
    </Provider>
  );
}

import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-native-paper";
import Home from "./src/pages/Home";
import Profile from "./src/pages/Profile";
import Login from "./src/pages/Login";
import theme from "./src/config/theme";
import { NavigationContainer } from "@react-navigation/native";
import Register from "./src/pages/Register";

export default function App() {
  return (
    <Provider theme={theme}>
      <NavigationContainer>
        <Register />
      </NavigationContainer>
    </Provider>
  );
}

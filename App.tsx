import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-native-paper";
import Home from "./src/pages/Home";
import Profile from "./src/pages/Profile";

export default function App() {
  return (
    <Provider>
      <Profile />
    </Provider>
  );
}

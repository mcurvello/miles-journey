import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-native-paper";
import Home from "./src/pages/Home";

export default function App() {
  return (
    <Provider>
      <Home />
    </Provider>
  );
}

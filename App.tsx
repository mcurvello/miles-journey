import { StatusBar } from "react-native";
import { Provider } from "react-native-paper";
import theme from "./src/config/theme";
import { NavigationContainer } from "@react-navigation/native";
import { SnackbarProvider } from "./src/contexts/Snackbar";
import Routes from "./src/routes";

export default function App() {
  return (
    <Provider theme={theme}>
      <SnackbarProvider>
        <NavigationContainer>
          <StatusBar />
          <Routes />
        </NavigationContainer>
      </SnackbarProvider>
    </Provider>
  );
}

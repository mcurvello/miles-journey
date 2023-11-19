import { DrawerHeaderProps } from "@react-navigation/drawer";
import { Appbar } from "react-native-paper";
import styles from "./styles";
import { Image, TouchableOpacity } from "react-native";

import logo from "../../../assets/logo.png";
import App from "../../../App";

export default function Menu({ navigation }: DrawerHeaderProps) {
  return (
    <Appbar.Header style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Image style={styles.logo} source={logo} />
      </TouchableOpacity>
      <Appbar.Action
        icon="menu"
        color="white"
        onPress={navigation.openDrawer}
      />
    </Appbar.Header>
  );
}

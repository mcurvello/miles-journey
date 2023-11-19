import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { User } from "../../types/user";
import { Dispatch, SetStateAction } from "react";
import { Button, Drawer } from "react-native-paper";
import { Text, View } from "react-native";
import styles from "./styles";
import theme from "../../config/theme";

interface DrawerContentProps extends DrawerContentComponentProps {
  userLogged?: User;
  setUserLogged: Dispatch<SetStateAction<User | undefined>>;
}

export default function DrawerContent({
  navigation,
  userLogged,
  setUserLogged,
}: DrawerContentProps) {
  const signOut = () => {
    setUserLogged(undefined);
    navigation.closeDrawer();
  };

  return (
    <DrawerContentScrollView>
      <Drawer.Section style={styles.container}>
        {userLogged && <Text style={styles.nome}>Olá {userLogged?.name}</Text>}
        <Button
          icon="home"
          mode="contained"
          onPress={() => navigation.navigate("Home")}
        >
          Página inicial
        </Button>
        {userLogged && (
          <Button
            icon="account"
            mode="contained"
            onPress={() => navigation.navigate("Profile")}
          >
            Editar dados pessoais
          </Button>
        )}
      </Drawer.Section>
      {userLogged ? (
        <View style={styles.container}>
          <Button
            icon="logout"
            mode="contained"
            buttonColor={theme.colors.error}
            onPress={signOut}
          >
            Sair
          </Button>
        </View>
      ) : (
        <Drawer.Section style={styles.container}>
          <Button
            icon="login"
            style={[styles.button, styles.login]}
            onPress={() => navigation.navigate("Login")}
          >
            Login
          </Button>
          <Button
            icon="account-arrow-up"
            style={[styles.button, styles.cadastre]}
            onPress={() => navigation.navigate("Register")}
          >
            Cadastre-se
          </Button>
        </Drawer.Section>
      )}
    </DrawerContentScrollView>
  );
}

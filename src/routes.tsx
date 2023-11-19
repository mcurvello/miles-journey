import { createDrawerNavigator } from "@react-navigation/drawer";
import { useState } from "react";
import { User } from "./types/user";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Menu from "./components/Menu";
import DrawerContent from "./components/DrawerContent";

export type RootStackParamList = {
  Home: undefined;
  Profile: undefined;
  Login: undefined;
  Register: undefined;
};

const Drawer = createDrawerNavigator<RootStackParamList>();

export default function Routes() {
  const [userLogged, setUserLogged] = useState<User | undefined>();

  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <DrawerContent
          {...props}
          userLogged={userLogged}
          setUserLogged={setUserLogged}
        />
      )}
      screenOptions={{
        header: Menu,
        drawerPosition: "right",
      }}
    >
      <Drawer.Screen name="Home">
        {(props) => <Home {...props} userLogged={userLogged} />}
      </Drawer.Screen>
      <Drawer.Screen name="Login">
        {(props) => <Login {...props} setUserLogged={setUserLogged} />}
      </Drawer.Screen>
      <Drawer.Screen name="Register">
        {(props) => <Register {...props} setUserLogged={setUserLogged} />}
      </Drawer.Screen>
      <Drawer.Screen name="Profile">
        {(props) => (
          <Profile
            {...props}
            userLogged={userLogged as User}
            setUserLogged={setUserLogged}
          />
        )}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
}

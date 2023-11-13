import { DrawerScreenProps } from "@react-navigation/drawer";
import { RootStackParamList } from "../../routes";
import { Dispatch, SetStateAction } from "react";
import { User } from "../../types/user";

export interface ProfileProps
  extends DrawerScreenProps<RootStackParamList, "Profile"> {
  userLogged: User;
  setUserLogged: Dispatch<SetStateAction<User | undefined>>;
}

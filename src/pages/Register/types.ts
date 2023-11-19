import { DrawerScreenProps } from "@react-navigation/drawer";
import { RootStackParamList } from "../../routes";
import { Dispatch, SetStateAction } from "react";
import { User } from "../../types/user";

export interface RegisterProps
  extends DrawerScreenProps<RootStackParamList, "Register"> {
  setUserLogged: Dispatch<SetStateAction<User | undefined>>;
}

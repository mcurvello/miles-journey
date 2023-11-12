import { DrawerScreenProps } from "@react-navigation/drawer";
import { RootStackParamList } from "../../routes";
import { TripTypes } from "../../types/trip";
import { User } from "../../types/user";

export interface Filters {
  type?: TripTypes;
  person: "1" | "2" | "3";
  origin: string;
  destination: string;
  filterPerUser: "cidade" | "estado" | "todas";
  dateDeparture?: string;
  dateReturn?: string;
}

export interface HomeProps
  extends DrawerScreenProps<RootStackParamList, "Home"> {
  userLogged: User | undefined;
}

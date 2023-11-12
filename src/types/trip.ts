import { ImageSourcePropType } from "react-native";

export enum TripTypes {
  ONE_WAY = "ida",
  ROUND_TRIP = "idaEVolta",
}

export interface Trip {
  title: string;
  value: number;
  photo: ImageSourcePropType;
  dateDeparture: string;
  dateReturn?: string;
  origin: string;
  stateOrigin: string;
  destination: string;
  type: TripTypes;
}

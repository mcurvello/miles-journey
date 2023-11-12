import { Trip } from "../../../types/trip";
import { Filters } from "../types";

export const filtrarViagens = (
  viagens: Trip[],
  filtros: Omit<Filters, "pessoas">,
  cidadeUsuario: string,
  estadoUsuario: string
): Promise<Trip[]> => {
  const viagensFiltradas = viagens.filter((viagem) => {
    const filtroPorCidade =
      filtros.filterPerUser !== "cidade" || viagem.origin === cidadeUsuario;
    const filtroPorEstado =
      filtros.filterPerUser !== "estado" ||
      viagem.stateOrigin === estadoUsuario;
    const filtroOrigem =
      !filtros.origin ||
      filtros.origin === viagem.origin ||
      filtros.origin === viagem.stateOrigin;
    const filtroDestino =
      !filtros.destination || filtros.destination === viagem.destination;
    const filtroTipo = !filtros.type || viagem.type === filtros.type;
    const filtroDataIda =
      !filtros.dateDeparture || viagem.dateDeparture === filtros.dateDeparture;
    const filtroDataVolta =
      !filtros.dateReturn || viagem.dateReturn === filtros.dateReturn;

    return (
      filtroPorCidade &&
      filtroPorEstado &&
      filtroOrigem &&
      filtroDestino &&
      filtroTipo &&
      filtroDataIda &&
      filtroDataVolta
    );
  });
  return new Promise((resolve) =>
    setTimeout(() => resolve(viagensFiltradas), 1000)
  );
};

export const filtrosEstaoVazios = ({
  type,
  origin,
  destination,
  filterPerUser,
  dateDeparture,
  dateReturn,
}: Filters) =>
  !type &&
  !origin &&
  !destination &&
  filterPerUser === "todas" &&
  !dateDeparture &&
  !dateReturn;

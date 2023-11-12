import server from "../../assets/server";
import { Trip } from "../types/trip";

export const getViagens = (
  pagina: number = 1,
  limite: number = 5
): Promise<{
  novasViagens: Trip[];
  pagina: number;
  totalPaginas: number;
}> => {
  const totalViagens = server.viagens.length;
  const primeiraViagem = (pagina - 1) * limite;
  const ultimaViagem = pagina * limite;
  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve({
          novasViagens: [...server.viagens.slice(primeiraViagem, ultimaViagem)],
          pagina,
          totalPaginas: Math.ceil(totalViagens / limite),
        }),
      1000
    )
  );
};

export const carregarOrigens = (): Promise<string[]> => {
  return new Promise((resolve) => {
    const origens = server.viagens.map((viagem) => viagem.origin).sort();
    return setTimeout(() => resolve([...new Set(origens)]), 1000);
  });
};

export const carregarDestinos = (): Promise<string[]> => {
  return new Promise((resolve) => {
    const destinos = server.viagens.map((viagem) => viagem.destination).sort();
    return setTimeout(() => resolve([...new Set(destinos)]), 1000);
  });
};

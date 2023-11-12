export type Gender = "Feminino" | "Masculino" | "Outro";

export interface User {
  id: string | number[];
  name: string;
  birthDate?: string;
  gender?: Gender;
  cpf?: string;
  phone?: string;
  city?: string;
  state?: string;
  email?: string;
  password?: string;
}

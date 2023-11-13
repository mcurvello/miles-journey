import server from "../../assets/server";
import { User } from "../types/user";
import uuidd from "react-native-uuid";

const users = server.usuarios;

export const loadUsers = (): Promise<User[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(users);
    }, 1000);
  });
};

export const addUser = (newUser: Omit<User, "id">): User => {
  const userWithId = { ...newUser, id: uuidd.v4() };
  users.push(userWithId);
  return userWithId;
};

export const login = (
  emailOrCpf: User["email"] | User["cpf"],
  password: User["password"]
) => {
  const user = users.find(
    (userOnServer) =>
      [userOnServer.cpf, userOnServer.email].includes(emailOrCpf) &&
      userOnServer.password === password
  );
  return user;
};

export const changeUserData = (newData: User) => {
  const index = users.findIndex((user) => user.id === newData.id);
  users[index] = newData;
};

export const deleteUser = (id: User["id"]) => {
  const index = users.findIndex((user) => user.id === id);
  users.splice(index, 1);
};

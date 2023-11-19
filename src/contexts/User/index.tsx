import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";

interface User {
  name: string;
}

interface UserContextState {
  user?: User;
  setUser: Dispatch<SetStateAction<User | undefined>>;
}

const UserContext = createContext<UserContextState>({
  setUser: () => {},
});

export const UserProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | undefined>();

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => {
  const { user, setUser } = useContext(UserContext);

  const signIn = (newUser: User) => useCallback(() => setUser(newUser), []);

  return { user, signIn };
};

export default useUser;

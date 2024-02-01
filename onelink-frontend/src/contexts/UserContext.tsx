import { createContext } from "react";
import UserDto from "../models/UserDto";

type UserContextDto = {
  user?: UserDto;
  //setUser(user: UserDto): void;
  logout(): void;
};

const UserContext = createContext<UserContextDto>({
  logout() {
    throw new Error("Logout not implemented");
  },
});

export default UserContext;

import { User2 } from "../../../shared/servizi/user";

export interface AuthState {
  user: User2 | null;
}

export const initialState: AuthState = {
  user: null,
};

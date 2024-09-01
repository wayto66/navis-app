import { type Dispatch, type SetStateAction } from "react";
import { type Customer, type User } from "./Models";

export interface ContextData {
  isLoading: boolean;
  users: User[];
  customers: Customer[];
  auth: User | undefined;
}

export interface Context {
  data: ContextData;
  setData: Dispatch<SetStateAction<ContextData>>;
}

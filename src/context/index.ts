import React from "react";
import { type Context, type ContextData } from "~/types/Context";

export const contextDefaultDataValue: ContextData = {
  isLoading: false,
  users: [],
  auth: undefined,
  customers: [],
};

const contextDefaultValue = {
  data: contextDefaultDataValue,
  setData: () => {
    ("");
  },
};

export const reactContext = React.createContext<Context>(contextDefaultValue);

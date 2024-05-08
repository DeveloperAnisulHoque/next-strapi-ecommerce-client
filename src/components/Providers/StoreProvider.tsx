'use client'
import store from "@/store/store";
import React, { ReactNode } from "react";
import { Provider } from "react-redux";

type ProviderTypes = {
  children: ReactNode;
};

const StoreProvider = ({ children }: ProviderTypes) => {
  return <Provider store={store}  >{children}</Provider>;
};

export default StoreProvider;

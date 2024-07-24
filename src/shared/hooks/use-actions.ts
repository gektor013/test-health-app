import { useMemo } from "react";

import { useAppDispatch } from "@/redux";
import {
  logIn,
  logOut,
  setSort,
  setFilter,
  clearFilter,
  setFilterShown,
} from "@/redux/features";
import { bindActionCreators } from "@reduxjs/toolkit";

const rootActions = {
  logIn,
  logOut,
  setSort,
  setFilter,
  clearFilter,
  setFilterShown,
};

export const useActions = () => {
  const dispatch = useAppDispatch();

  return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch]);
};

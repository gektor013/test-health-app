import { isRejectedWithValue, Middleware } from "@reduxjs/toolkit";
import { logOut } from "../features";

interface RejectedAction {
  payload: {
    status: number;
  };
}

export const unauthenticatedMiddleware: Middleware =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    const status = (action as RejectedAction)?.payload?.status;

    if (isRejectedWithValue(action) && status === 401) {
      dispatch(logOut());
    }
    return next(action);
  };

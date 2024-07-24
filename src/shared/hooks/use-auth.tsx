import { useRouter } from "expo-router";
import { ExpoRouter } from "expo-router/types/expo-router";
import { useActions } from "./use-actions";
import { useAppSelector } from "@/redux";
import { User } from "@/types/user";

interface ExtraParams {
  redirect?: ExpoRouter.Href;
  callback?: () => void;
}

export const useAuth = () => {
  const { isAuthenticated, user } = useAppSelector((store) => store.auth);
  const { logIn, logOut } = useActions();

  const router = useRouter();

  const checkAndHandleExtraParams = (extra?: ExtraParams) => {
    if (extra?.callback) extra.callback();
    if (extra?.redirect) router.push(extra.redirect);
  };

  const loginUser = (user: User, extra?: ExtraParams) => {
    logIn(user);
    checkAndHandleExtraParams(extra);
  };

  const logoutUser = (extra?: ExtraParams) => {
    logOut();
    checkAndHandleExtraParams(extra);
  };

  return {
    isAuthenticated,
    user,
    loginUser,
    logoutUser,
  };
};

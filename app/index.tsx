import { useAuth } from "@/shared/hooks";
import { Redirect } from "expo-router";

const Index = () => {
  const { isAuthenticated } = useAuth();

  return <Redirect href={isAuthenticated ? "/tabs" : "/welcome"} />;
};
export default Index;

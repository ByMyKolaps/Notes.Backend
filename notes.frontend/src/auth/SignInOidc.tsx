import { useEffect, FC, useContext } from "react";
import { useNavigate } from "react-router-dom";
import userManager, { signInRedirectCallback } from "./user-service";
import { AuthContext } from "../context/auth-context";

const SignInOidc: FC<{}> = () => {
  const navigation = useNavigate();
  const { setUser } = useContext(AuthContext);
  useEffect(() => {
    async function signInAsync() {
      console.log("Hello from SignInOidc component");
      const user = await signInRedirectCallback();
      if (setUser) setUser(user.profile.name || "");
      navigation("/");
    }
    signInAsync();
  }, [navigation]);
  return <div>Redirecting</div>;
};

export default SignInOidc;

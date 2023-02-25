import { USER } from "@/config";
import Router, { useRouter } from "next/router";
import { useEffect } from "react";
import toast from "react-hot-toast";
import useStorage from "../hooks/useStorage";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { getItem } = useStorage();
  let user = JSON.parse(getItem(USER) || "{}");

  useEffect(() => {
    if (Object.keys(user).length == 0) {
      Router.replace("/signin");
      toast.error("You need to login to access this page.");
    }
  }, [router, user]);

  return <>{user ? children : null}</>;
};
export default ProtectedRoute;

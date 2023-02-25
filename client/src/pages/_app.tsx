import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "../components/ProtectedRoute";

export default function App({ Component, pageProps }: AppProps) {
  const noAuthRequired = ["/signup", "/signin"];
  const router = useRouter();

  return (
    <>
      <Toaster position="top-right" />
      {noAuthRequired.includes(router.pathname) ? (
        <Component {...pageProps} />
      ) : (
        <ProtectedRoute>
          <Component {...pageProps} />
        </ProtectedRoute>
      )}
    </>
  );
}

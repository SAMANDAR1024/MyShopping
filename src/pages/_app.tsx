import Header from "@/components/layout/Header";
import { Toaster } from "@/components/ui/sonner";
import { store } from "@/store/store";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Header />
      <Component {...pageProps} />;
      <Toaster />
    </Provider>
  );
}

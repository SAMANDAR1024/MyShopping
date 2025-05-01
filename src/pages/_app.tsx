import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { Toaster } from "@/components/ui/sonner";
import { store } from "@/store/store";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <div className="h-screen flex-col flex justify-between">
        <div>
          <Header />
          <Component {...pageProps} />;
          <Toaster />
        </div>
        <Footer />
      </div>
    </Provider>
  );
}

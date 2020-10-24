import UserProvider from "src/context/userContext";

// global styles
import "bootstrap/dist/css/bootstrap.min.css";
import "src/styles/main.scss";

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}

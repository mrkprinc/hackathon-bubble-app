import UserProvider from "src/context/userContext";
import BubbleProvider from "src/context/bubbleContext";

// global styles
import "bootstrap/dist/css/bootstrap.min.css";
import "src/styles/main.scss";

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <BubbleProvider>
        <Component {...pageProps} />
      </BubbleProvider>
    </UserProvider>
  );
}

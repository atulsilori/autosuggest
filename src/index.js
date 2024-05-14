import React from "react";
import { hydrateRoot } from "react-dom/client";
import { Provider } from "react-redux";

import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import { createStore } from "./redux/store";
import "./styles/global.scss";

const App = () => {
  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
};

export default App;

// Check if window is defined (running in a browser)
if (typeof window !== "undefined") {
  // Create Redux store with preloaded state
  const store = createStore(window.INITIAL_STATE);
  // Delete the preloaded state to avoid leaking it to the client
  delete window.INITIAL_STATE;

  const rootElement = document.getElementById("root");
  hydrateRoot(
    rootElement,
    <Provider store={store}>
      <App />
    </Provider>
  );
  // const root = createRoot(rootElement);
  // root.render(<App />);
}

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./shared/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import ToastContainerWrapper from "./toastcontainer/ToastContainerWrapper";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
let persistor = persistStore(store);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
        <ToastContainerWrapper />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);

reportWebVitals();

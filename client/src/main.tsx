import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import GoogleAuthProvider from "./provider/GoogleAuthProvider.tsx";
import { Provider } from "react-redux";
import store from "./redux/store.ts";
import AlertProvider from "./provider/AlertProvider.tsx";
import { BrowserRouter as Router } from "react-router-dom";
import ErrorBoundary from "./constant/ErrorBoundary.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <AlertProvider>
          <GoogleAuthProvider>
            <ErrorBoundary fallback="Error occured">
              <App />
            </ErrorBoundary>
          </GoogleAuthProvider>
        </AlertProvider>
      </Router>
    </Provider>
  </React.StrictMode>
);

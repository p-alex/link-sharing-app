import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { store } from "./redux/app/store.ts";
import { Provider } from "react-redux";
import GlobalPopups from "./components/GlobalPopups/GlobalPopups.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
      <GlobalPopups />
    </Provider>
  </BrowserRouter>,
);

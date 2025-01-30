import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { HashRouter } from "react-router-dom";
import 'remixicon/fonts/remixicon.css';
import { Provider } from "react-redux";
import { Store } from "./Store/Store.jsx";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

if (typeof global === "undefined") {
  window.global = window;
}

createRoot(document.getElementById("root")).render(
  <Provider store={Store}>
    <HashRouter>
      <App />
      <ToastContainer
        position="top-center" // Set position to center at the top
        autoClose={5000} // Automatically close the toast after 5 seconds
        hideProgressBar={false} // Show the progress bar
        newestOnTop={true} // Newest notifications appear at the top
        closeOnClick // Close toast on click
        pauseOnHover // Pause timer when hovering
        draggable // Allow drag-to-close
        theme="colored" // Optional theme
        className="center-toast" // Add custom styles
      />
    </HashRouter>
  </Provider>
);

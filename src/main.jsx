import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ThemeProvider } from "./theme/ThemeProvider.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import ErrorBoundary from "./components/ErrorBoundary.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  
  <React.StrictMode>
    
    <BrowserRouter>
    
      <Provider store={store}>
        
        <ThemeProvider>
          <ErrorBoundary>
          <App />
          </ErrorBoundary>
        </ThemeProvider>
        
      </Provider>
      
    </BrowserRouter>
   
  </React.StrictMode>
  
);

import React from "react";
import { RootProvider } from "./providers";
import { Routes } from "./routes";

const App = () => {
  return (
    <div id="App">
      <RootProvider>
        <Routes />
      </RootProvider>
    </div>
  );
};

export default App;

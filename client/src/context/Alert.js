// el contexto que sea mostrar o no
import React, { createContext, useState, useContext } from "react";

const GlobalContext = createContext();

const useGlobalContext = () => {
  return useContext(GlobalContext);
};

function ContextProvider({ children }) {
  const [show, setShow] = useState(false);

  function hideAlert() {
    setTimeout(() => {
      setShow(false);
    }, 2000);
  }

  console.log("Alert context");

  return (
    <GlobalContext.Provider value={{ show, setShow, hideAlert }}>
      {children}
    </GlobalContext.Provider>
  );
}

export { GlobalContext, ContextProvider, useGlobalContext };

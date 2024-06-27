import React, { createContext, useContext, useState } from 'react';

const ConfigContext = createContext();

export const ConfigProvider = ({ children }) => {
  const [compileProvider, setCompileProvider] = useState(null);
  const [controllerProvider, setControllerProvider] = useState(null);

  return (
    <ConfigContext.Provider value={{ compileProvider, setCompileProvider, controllerProvider, setControllerProvider }}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => useContext(ConfigContext);

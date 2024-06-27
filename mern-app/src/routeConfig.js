// src/routeConfig.js
import { useConfig } from './ConfigContext';

export const useRouteConfig = () => {
  const { setCompileProvider, setControllerProvider } = useConfig();

  const configureProviders = (compileProvider, controllerProvider) => {
    setCompileProvider(compileProvider);
    setControllerProvider(controllerProvider);
  };

  return { configureProviders };
};

import React from 'react';
import { useRouteConfig } from 'routeConfig';

const MyComponent = () => {
  const { configureProviders } = useRouteConfig();

  React.useEffect(() => {
    // Mock providers for example
    const mockCompileProvider = { /* ... */ };
    const mockControllerProvider = { /* ... */ };

    configureProviders(mockCompileProvider, mockControllerProvider);
  }, [configureProviders]);

  return (
    <div>
      <h1>My Component</h1>
    </div>
  );
};

export default MyComponent;

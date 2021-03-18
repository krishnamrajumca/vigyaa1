import 'react-perfect-scrollbar/dist/css/styles.css';
import React from 'react';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';

import theme from 'src/theme';
import routes from 'src/routes';
import StoreConfig from 'src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

const App = () => {
  const routing = useRoutes(routes);

  return (
    <Provider store={StoreConfig.store}>
      <PersistGate loading={null} persistor={StoreConfig.persistor}>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          {routing}
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;

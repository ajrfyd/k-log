import App from './App.tsx';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import rootReducer from './store/index.ts';
import thunk from 'redux-thunk';
import { hydrate } from 'react-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from 'styled-components';
import themes from '@styles/themes.ts';
import GlobalStyles from '@styles/global';
import 'bootstrap/dist/css/bootstrap.min.css';
import FullScreenMessage from '@shared/FullScreenMessage.tsx';
import { Suspense } from 'react';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: any;
  }
}

const client = new QueryClient();
// const store = createStore(
//   rootReducer,
//   window.__REDUX_DEVTOOLS_EXTENSION__ &&
//     window.__REDUX_DEVTOOLS_EXTENSION__(applyMiddleware(thunk))
// );

const store = createStore(rootReducer, applyMiddleware(thunk));

const root = document.getElementById('root') as HTMLElement;

const Wrappers = (
  <QueryClientProvider client={client}>
    <ReactQueryDevtools />
    <Provider store={store}>
      <HelmetProvider>
        <GlobalStyles />
        <ThemeProvider theme={themes}>
          {/* <Suspense fallback={<FullScreenMessage type="loading" />}> */}
          <BrowserRouter>
            <Suspense fallback={<FullScreenMessage type="loading" />}>
              <App />
            </Suspense>
          </BrowserRouter>
          {/* </Suspense> */}
        </ThemeProvider>
      </HelmetProvider>
    </Provider>
  </QueryClientProvider>
);

root.hasChildNodes()
  ? hydrate(Wrappers, root)
  : createRoot(root).render(Wrappers);

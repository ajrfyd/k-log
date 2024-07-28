import App from './App.tsx';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import rootReducer from './store/index.ts';
import thunk from 'redux-thunk';
import { hydrate } from 'react-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from 'styled-components';
import themes from '@styles/themes.ts';
import GlobalStyles from '@styles/global';
import 'bootstrap/dist/css/bootstrap.min.css';
import { queryClient } from './lib/api/queryClient.ts';
import { ErrorBoundary } from 'react-error-boundary';
import FullScreenErrorMessage from './components/shared/FullScreenErrorMessage.tsx';
import { socketMiddleware, userMiddleware } from './store/middlewares.ts';
// import FullScreenMessage from '@shared/FullScreenMessage.tsx';
// import { Suspense } from 'react';
// import ErrorBoundary from '@shared/ErrorBoundary.tsx';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: any;
  }
}

// const client = new QueryClient();
// const store = createStore(
//   rootReducer,
//   window.__REDUX_DEVTOOLS_EXTENSION__ &&
//     window.__REDUX_DEVTOOLS_EXTENSION__(applyMiddleware(thunk))
// );

const store = createStore(
  rootReducer,
  applyMiddleware(socketMiddleware(), userMiddleware, thunk)
);

const root = document.getElementById('root') as HTMLElement;

const Wrappers = (
  <QueryClientProvider client={queryClient}>
    <ReactQueryDevtools />
    <Provider store={store}>
      <HelmetProvider>
        <GlobalStyles />
        <ThemeProvider theme={themes}>
          <BrowserRouter>
            <ErrorBoundary FallbackComponent={FullScreenErrorMessage}>
              {/* <Suspense fallback={<FullScreenMessage type="loading" />}> */}
              <App />
              {/* </Suspense> */}
            </ErrorBoundary>
          </BrowserRouter>
        </ThemeProvider>
      </HelmetProvider>
    </Provider>
  </QueryClientProvider>
);

root.hasChildNodes()
  ? hydrate(Wrappers, root)
  : createRoot(root).render(Wrappers);

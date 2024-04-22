import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import rootReducer from './store/index.ts';
import { thunk } from 'redux-thunk';
import { hydrate } from 'react-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from 'styled-components';
import themes from '@styles/themes.ts';
import 'bootstrap/dist/css/bootstrap.min.css';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: any;
  }
}

const client = new QueryClient();
const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__(applyMiddleware(thunk))
);

const root = document.getElementById('root') as HTMLElement;

const Wrappers = (
  <QueryClientProvider client={client}>
    <HelmetProvider>
      <ReactQueryDevtools />
      <BrowserRouter>
        <Provider store={store}>
          <ThemeProvider theme={themes}>
            <App />
          </ThemeProvider>
        </Provider>
      </BrowserRouter>
    </HelmetProvider>
  </QueryClientProvider>
);

root.hasChildNodes()
  ? hydrate(Wrappers, root)
  : createRoot(root).render(Wrappers);

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <HelmetProvider>
//     <BrowserRouter>
//       <Provider store={store}>
//         <App />
//       </Provider>
//     </BrowserRouter>
//   </HelmetProvider>,
// );

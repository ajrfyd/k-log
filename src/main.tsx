import ReactDOM, { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import rootReducer from './store/index.ts';
import { thunk } from 'redux-thunk';
import { hydrate } from 'react-dom';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: any;
  }
}

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__(thunk),
);

const root = document.getElementById('root') as HTMLElement;

const Wrappers = (
  <HelmetProvider>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </HelmetProvider>
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

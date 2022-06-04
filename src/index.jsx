import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import RootStore from './store/root.store';

const rootStore = RootStore.create({});

export const StoreContext = createContext(rootStore);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <StoreContext.Provider value={rootStore}>
      <App />
    </StoreContext.Provider>
  </React.StrictMode>
);

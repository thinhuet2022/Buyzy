import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './stores/store';
import AppRoutes from './routes';
import './App.css'

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter  > 
        <div className="min-h-screen w-full bg-gray-100">
          <AppRoutes />
        </div>
      </BrowserRouter>
    </Provider>
  );
};

export default App;

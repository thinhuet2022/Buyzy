import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {store} from './stores/store';
import AppRoutes from './routes';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'

const App = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <div className="min-h-screen w-full bg-gray-100">
                    <AppRoutes/>
                    <ToastContainer
                        position="top-right"
                        autoClose={3000}
                        hideProgressBar={false}
                        newestOnTop
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                    />
                </div>
            </BrowserRouter>
        </Provider>
    );
};

export default App;

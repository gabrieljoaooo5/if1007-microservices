import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import './global.css';

import Routes from './routes';

import { SnackbarProvider } from 'notistack';

function App() {
  return (
    <SnackbarProvider>
        <Routes />
    </SnackbarProvider> 
  );
}

export default App;

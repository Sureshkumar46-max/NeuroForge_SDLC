import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { WorkspaceProvider } from './context/WorkspaceContext.jsx';
import { AgileProvider } from './context/AgileContext.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <WorkspaceProvider>
        <AgileProvider>
          <App />
        </AgileProvider>
      </WorkspaceProvider>
    </BrowserRouter>
  </React.StrictMode>
);

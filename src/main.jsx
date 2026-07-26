import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { ProjectsProvider } from './context/ProjectsContext.jsx';
import { WorkspaceProvider } from './context/WorkspaceContext.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <WorkspaceProvider>
        <ProjectsProvider>
          <App />
        </ProjectsProvider>
      </WorkspaceProvider>
    </BrowserRouter>
  </React.StrictMode>
);

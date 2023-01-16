import React from 'react';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import './App.scss';
import Editor from './components/editor/Editor';
import ErrorPage from './components/error-page';
import LandingPage from './components/landingPage/LandingPage';

const router = createHashRouter([
  {
    path: '/',
    element: <LandingPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/editor',
    element: <Editor />,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

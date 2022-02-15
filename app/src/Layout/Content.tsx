import { lazy, Suspense } from 'react';

import { Route, Routes } from 'react-router-dom';
import Container from '@mui/material/Container';

import ErrorPage from '../routes/ErrorPage';

const Main = lazy(() => import('../routes/Main'));
const Stats = lazy(() => import('../routes/Stats'));

function Content() {
  return (
    <Container component="main">
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<>...</>}>
              <Main />
            </Suspense>
          }
        />
        <Route
          path="/stats/:id"
          element={
            <Suspense fallback={<>...</>}>
              <Stats />
            </Suspense>
          }
        />
        <Route
          path="/error404" 
          element={<ErrorPage message='Oops! The page your looking for does not exist.' />}
        />
        <Route
          path="/error500"
          element={<ErrorPage message='Oops! Looks like something wrong with the server.' />}
        />
        <Route
          path="/error"
          element={<ErrorPage message='Oops! Something went wrong.' />}
        />
      </Routes>
    </Container>
  );
}

export default Content;

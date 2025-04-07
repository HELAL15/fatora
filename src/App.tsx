import { Route, Routes } from 'react-router';
import { Home, NotFound } from './pages';
import Layout from './components/layouts/Layout';

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          {/* home page  */}
          <Route index element={<Home />} />
          {/* ** not found page */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

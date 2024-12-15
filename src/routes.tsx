import { Route, Routes } from 'react-router';

import Home from './routes/home';
import RootLayout from './routes/layout';

export default function Root() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />} >
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
}
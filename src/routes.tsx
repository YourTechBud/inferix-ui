import { Navigate, Route, Routes } from 'react-router';

import APIKeys from './routes/api-keys';
import RootLayout from './routes/layout';
import Chat from './routes/playground/chat';

export default function Root() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Navigate to="/playground/chat" />} />
        <Route path="playground">
          <Route index element={<Navigate to="/playground/chat" />} />
          <Route path="chat" element={<Chat />} />
        </Route>
        <Route path="api-keys" element={<APIKeys />} />
      </Route>
    </Routes>
  );
}

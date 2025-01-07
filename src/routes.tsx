import {
  index,
  layout,
  prefix,
  route,
  type RouteConfig,
} from '@react-router/dev/routes';

export default [
  layout('./routes/layout.tsx', [
    index('./routes/index.tsx'),
    ...prefix('/playground', [
      index('./routes/playground/index.tsx'),
      route('/chat', './routes/playground/chat.tsx'),
    ]),
    route('/api-keys', './routes/api-keys.tsx'),
  ]),
  // * matches all URLs, the ? makes it optional so it will match / as well
  route('*?', 'catchall.tsx'),
] satisfies RouteConfig;

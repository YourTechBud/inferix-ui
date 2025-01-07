import { QueryClientProvider } from '@tanstack/react-query';
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';

import { queryClient } from './lib/client';
import { Toaster } from './ui/components/sonner';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Inferix</title>
        <Meta />
        <Links />
      </head>
      <body>
        <div className="min-h-screen font-sans antialiased">
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </div>
        <Toaster />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function Root() {
  return <Outlet />;
}

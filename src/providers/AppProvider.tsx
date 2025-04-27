import { FC, ReactNode } from 'react';
import { BrowserRouter as Router } from 'react-router';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AntdProvider from './AntdProvider';
import { Toaster } from 'sonner';

interface IProps {
  children: ReactNode;
}

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false
    }
  }
});

const AppProvider: FC<IProps> = ({ children }) => {
  return (
    <>
      <Router>
        <QueryClientProvider client={queryClient}>
          <AntdProvider>{children}</AntdProvider>
          <Toaster position="top-center" richColors={true} />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </Router>
    </>
  );
};

export default AppProvider;

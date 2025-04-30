import { FC, ReactNode } from 'react';
import { BrowserRouter as Router } from 'react-router';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AntdProvider from './AntdProvider';
import { Toaster } from 'sonner';
import { persistor, store } from '../store/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import LoaderPersist from '../components/ui/LoaderPersist';

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
      <Provider store={store}>
        <Router>
          <QueryClientProvider client={queryClient}>
            <PersistGate loading={<LoaderPersist />} persistor={persistor}>
              <AntdProvider>{children}</AntdProvider>
            </PersistGate>
            <Toaster position="top-center" richColors={true} />
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </Router>
      </Provider>
    </>
  );
};

export default AppProvider;

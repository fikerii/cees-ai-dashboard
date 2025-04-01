import { AppWrapper } from "./components/common/PageMeta";
import { ThemeProvider } from "./context/ThemeContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import AppRoutes from "./routes";
import { Suspense } from "react";
import Loading from "./pages/Loading";
import { ToastContainer } from "react-toastify";
import { ErrorPage } from "./components/common/ErrorPage";
import { AuthProvider } from "./context/AuthContext";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

export default function App() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <ErrorPage>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <AppWrapper>
                <ThemeProvider>
                  <ToastContainer
                    position="bottom-right"
                    style={{ zIndex: 999999 }}
                  />
                  <AppRoutes />
                </ThemeProvider>
              </AppWrapper>
            </AuthProvider>
          </QueryClientProvider>
        </ErrorPage>
      </Suspense>
    </>
  );
}

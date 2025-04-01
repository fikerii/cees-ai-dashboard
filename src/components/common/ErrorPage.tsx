import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import Button from "../ui/button/Button";
import PageMeta from "./PageMeta";
import { ReactNode } from "react";

export const ErrorPage = ({ children }: { children: ReactNode }) => {
  const { reset } = useQueryErrorResetBoundary();
  return (
    <ErrorBoundary
      onReset={reset}
      fallbackRender={(props) => <ErrorFallback {...props} />}
    >
      {children}
    </ErrorBoundary>
  );
};

const ErrorFallback = ({ resetErrorBoundary }: FallbackProps) => {
  const handleRefresh = () => {
    resetErrorBoundary();
  };

  return (
    <div>
      <PageMeta
        title="Error | CS AI"
        description="This is React.js Error page for CS AI"
      />
      {/* <PageBreadcrumb pageTitle="Wrong Page" /> */}
      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
        <div className="mx-auto w-full max-w-[630px] text-center">
          <h3 className="mb-4 font-semibold text-gray-800 text-theme-xl dark:text-white/90 sm:text-2xl">Oops... Something went wrong!</h3>
          <div className="flex space-x-4">
            <Button onClick={() => resetErrorBoundary()}>Try again</Button>

            <Button onClick={handleRefresh}>Refresh</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

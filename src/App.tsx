import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import { useState } from "react";
import { routes } from "./routes";
import { ConfigProvider, App as AntdApp } from "antd";
import theme from "./config/theme";
import GlobalStyles from "./config/globalStyles";
import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/header/Header";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AuthProvider } from "./context/AuthContext";

function AppRoutes() {
  const element = useRoutes(routes);
  return element;
}

function MainLayout() {
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  const toggleMobileSidebar = () => {
    setShowMobileSidebar(!showMobileSidebar);
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Mobile sidebar backdrop */}
      {showMobileSidebar && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-50 z-20 lg:hidden"
          onClick={toggleMobileSidebar}
        ></div>
      )}

      {/* Sidebar - hidden on mobile unless toggled */}
      <div
        className={`fixed inset-y-0 left-0 z-30 lg:relative lg:z-0 transform ${
          showMobileSidebar ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden p-[10px] py-[1.5rem] rounded-lg">
        <Header user={null} onMenuClick={toggleMobileSidebar} />
        <div className="flex-1 overflow-y-auto">
          <div className="mx-auto">
            <main>
              <AppRoutes />
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ConfigProvider theme={theme}>
          <AntdApp>
            <GlobalStyles />
            <Router>
              <MainLayout />
            </Router>
            <ReactQueryDevtools initialIsOpen={false} />
          </AntdApp>
        </ConfigProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;

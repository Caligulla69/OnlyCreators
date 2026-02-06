import Header from "./Header";
import Sidebar from "./Sidebar";
import { ToastProvider } from "../common/Toast";
import { useTheme } from "../../context/ThemeContext";

const Layout = ({ children }) => {
  const { isDark } = useTheme();

  return (
    <ToastProvider>
      <div className="min-h-screen transition-colors duration-300">
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <div className="flex-1 flex flex-col min-h-screen lg:ml-0 overflow-y-auto">
            <Header />
            <main
              className={`flex-1 p-4 md:p-6 lg:p-8 transition-colors duration-300 ${
                isDark ? "bg-dark-bg" : "bg-background"
              }`}
            >
              {children}
            </main>
          </div>
        </div>
      </div>
    </ToastProvider>
  );
};

export default Layout;

import React from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import MainSection from "./components/MainSection";
import Footer from "./components/Footer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const App: React.FC = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col h-screen justify-between">
        <Navbar />
        <div className="flex overflow-hidden flex-grow">
          <Sidebar />
          <MainSection />
        </div>
        <Footer />
      </div>
    </QueryClientProvider>
  );
};

export default App;

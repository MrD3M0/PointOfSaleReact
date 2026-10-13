import "./App.css";

import { AuthProvider } from "./providers/auth-provider";

import { queryClient } from "./lib/query-keys";
import AppRoutingSetup from "./app-routing-setup";
import { Toaster } from "./components/ui/sonner";
import { BrowserRouter } from "react-router";
import { QueryClientProvider } from "@tanstack/react-query";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Toaster richColors position="top-right" closeButton />
        <AuthProvider>
          <AppRoutingSetup />
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;

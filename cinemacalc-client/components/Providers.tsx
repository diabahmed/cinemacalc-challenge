"use client";

import { TooltipProvider } from "@/components/ui/tooltip";
import { store } from "@/state/store";
import { Provider } from "react-redux";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <TooltipProvider>{children}</TooltipProvider>
    </Provider>
  );
}

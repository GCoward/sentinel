"use client";

import {
  QueryClientProvider,
  type QueryClient,
} from "@tanstack/react-query";
import { useState } from "react";
import { getQueryClient } from "@/lib/query-client";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState<QueryClient>(() => getQueryClient());

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

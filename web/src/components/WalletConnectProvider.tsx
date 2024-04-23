// https://wagmi.sh/react/guides/ssr
// https://docs.walletconnect.com/web3modal/nextjs/about

"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { type State, WagmiProvider } from "wagmi";
import { wagmiConfig, projectId } from "@/lib/wagmiConfig";
import { createWeb3Modal } from "@web3modal/wagmi/react";

type Props = {
  children: ReactNode;
  initialState: State | undefined;
};

const queryClient = new QueryClient();

if (!projectId) throw new Error("Project ID is not defined");

// Create modal
createWeb3Modal({
  wagmiConfig: wagmiConfig,
  projectId,
});

export function WalletConnectProvider({ children, initialState }: Props) {
  return (
    <WagmiProvider config={wagmiConfig} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}

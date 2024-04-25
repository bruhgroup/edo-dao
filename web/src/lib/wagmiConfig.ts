import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";

import { cookieStorage, createStorage, http } from "wagmi";
import { localhost, mainnet, sepolia } from "wagmi/chains";
import { classdaoAbi } from "@/lib/abi/CLASSDAO.abi";

export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

if (!projectId) throw new Error("Project ID is not defined");

const metadata = {
  name: "Web3Modal",
  description: "Web3Modal Example",
  url: "http://localhost:3000", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const chains = [sepolia, localhost] as const;
export const wagmiConfig = defaultWagmiConfig({
  chains,
  transports: {
    [sepolia.id]: http(),
    [localhost.id]: http(),
  },
  projectId,
  metadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
});

export const contractConfig = {
  address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
  abi: classdaoAbi,
} as const;

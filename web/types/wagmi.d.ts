export * from 'wagmi';

declare module 'wagmi' {
    interface Register {
        config: typeof config
    }
}
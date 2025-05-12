import { ClerkProvider as ClerkProviderBase } from '@clerk/nextjs';

export default function ClerkProvider({ children }: { children: React.ReactNode }) {
    return <ClerkProviderBase>{children}</ClerkProviderBase>;
}

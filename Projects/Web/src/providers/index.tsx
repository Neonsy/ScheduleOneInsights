import ClerkProvider from '@/providers/clerk';

export default function Providers({ children }: { children: React.ReactNode }) {
    return <ClerkProvider>{children}</ClerkProvider>;
}

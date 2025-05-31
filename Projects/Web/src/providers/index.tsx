import ClerkProvider from '@/providers/clerk';
import { ReactNode } from 'react';

export default function Providers({ children }: { children: ReactNode }) {
    return <ClerkProvider>{children}</ClerkProvider>;
}

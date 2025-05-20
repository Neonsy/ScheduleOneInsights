import { ReactNode } from 'react';

interface ContainerProps {
    children: ReactNode;
}

export default function Container({ children }: ContainerProps) {
    return <div className='w-full px-2 md:container md:mx-auto md:max-w-screen-2xl md:px-4'>{children}</div>;
}

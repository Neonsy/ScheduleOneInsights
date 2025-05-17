'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, type ReactNode, type MouseEvent } from 'react';

export default function Modal({ children }: { readonly children: ReactNode }) {
    const router = useRouter();
    const dialogRef = useRef<HTMLDialogElement>(null);

    const dismissModal = () => {
        router.back();
    };

    useEffect(() => {
        const dialog = dialogRef.current;
        if (dialog && !dialog.open) {
            dialog.showModal();
        }
    }, []); // Run once on mount

    const handleDialogClick = (event: MouseEvent<HTMLDialogElement>) => {
        if (event.target === dialogRef.current) {
            dismissModal();
        }
    };

    return (
        <dialog
            ref={dialogRef}
            onCancel={dismissModal} // Handles Escape key
            onClick={handleDialogClick} // Handles backdrop click
            className='fixed inset-0 z-[999] m-auto h-fit max-h-[90svh] w-fit max-w-[90vw] overflow-y-auto rounded-lg bg-transparent p-0 shadow-2xl backdrop:bg-black/70'>
            <div className=''>{children}</div>
        </dialog>
    );
}

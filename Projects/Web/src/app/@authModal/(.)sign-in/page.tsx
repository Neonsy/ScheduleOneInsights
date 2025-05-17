// src/app/@authModal/(...)sign-in/page.tsx
'use client';

import { SignIn } from '@clerk/nextjs';
import Modal from '@/app/@authModal/modal'; // <--- IMPORT YOUR MODAL
import { Spinner } from '@/components/LoadingSpinner';

export default function InterceptedSignInPage() {
    return (
        <Modal>
            <SignIn fallback={<Spinner className='overflow-hidden' size={'large'} />} />
        </Modal>
    );
}

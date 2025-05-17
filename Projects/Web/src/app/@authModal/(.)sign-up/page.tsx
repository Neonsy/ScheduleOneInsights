// src/app/@authModal/(...)sign-up/page.tsx
'use client';

import { SignUp } from '@clerk/nextjs';
import Modal from '@/app/@authModal/modal'; // <--- IMPORT YOUR MODAL
import { Spinner } from '@/components/LoadingSpinner';

export default function InterceptedSignUpPage() {
    return (
        <Modal>
            <SignUp fallback={<Spinner className='overflow-hidden' size={'large'} />} />
        </Modal>
    );
}

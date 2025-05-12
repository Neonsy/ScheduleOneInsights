import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';
import { MdBolt } from 'react-icons/md';

export default function AccountArea() {
    return (
        <div>
            <SignedOut>
                <div className='flex items-center gap-x-2'>
                    <SignInButton>
                        <button
                            type='button'
                            className='inline-flex cursor-pointer items-center gap-1 rounded-lg bg-primary text-primary-foreground font-semibold px-5 py-2 transition-all shadow hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary active:scale-[0.98] drop-shadow-[0_0_12px_theme(colors.primary.DEFAULT)/60]'>
                            Sign In
                        </button>
                    </SignInButton>
                    <SignUpButton>
                        <button
                            type='button'
                            className='inline-flex cursor-pointer items-center gap-1 rounded-lg bg-secondary text-secondary-foreground font-semibold px-5 py-2 transition-all shadow hover:bg-secondary/90 focus:outline-none focus:ring-2 focus:ring-secondary active:scale-[0.98] drop-shadow-[0_0_12px_theme(colors.secondary.DEFAULT)/60]'>
                            Sign Up
                            <MdBolt className='ml-1 text-xl' />
                        </button>
                    </SignUpButton>
                </div>
            </SignedOut>
            <SignedIn>
                <UserButton
                    appearance={{
                        elements: {
                            avatarBox:
                                'ring-2 ring-primary drop-shadow-[0_0_12px_theme(colors.primary.DEFAULT)/60] transition-all w-min-12 h-min-12',
                        },
                    }}
                />
            </SignedIn>
        </div>
    );
}

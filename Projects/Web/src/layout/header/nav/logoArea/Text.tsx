interface TextProps {
    layout?: 'row' | 'column';
    className?: string;
}

export default function Text({ layout = 'row', className = '' }: TextProps) {
    return (
        <span
            className={`flex flex-col items-center justify-center leading-tight ${layout === 'row' ? 'lg:flex-row' : ''} ${className}`.trim()}>
            <span className='clamp-[text,1rem,1.5rem,md,2xl] flex flex-row gap-1 font-extrabold'>
                <span className='text-primary drop-shadow-[0_0_8px_theme(colors.primary.DEFAULT)/80]'>Schedule</span>
                <span className='text-slate-50 drop-shadow-[0_0_8px_theme(colors.slate.50)/80]'>One</span>
            </span>
            <span className='clamp-[text,1rem,1.5rem,md,2xl] text-secondary drop-shadow-[0_0_8px_theme(colors.secondary.DEFAULT)/80] mt-0.5 font-extrabold'>
                Insights
            </span>
        </span>
    );
}

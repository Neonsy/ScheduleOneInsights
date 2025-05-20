import Nav from '@/layout/header/nav';
import Container from '@/components/Container';

export default function Header() {
    return (
        <header className='bg-header-main sticky top-0 z-50 w-full py-2'>
            <Container>
                <Nav />
            </Container>
        </header>
    );
}

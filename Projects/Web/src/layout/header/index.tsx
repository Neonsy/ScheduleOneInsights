import Container from '@/components/Container';
import Nav from '@/layout/header/nav';

export default function Header() {
    return (
        <header className='bg-header-main sticky top-0 z-50'>
            <Container>
                <Nav />
            </Container>
        </header>
    );
}

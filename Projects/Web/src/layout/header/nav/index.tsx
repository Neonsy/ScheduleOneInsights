import AccountArea from '@/layout/header/nav/accountArea';
import LogoArea from '@/layout/header/nav/logoArea';
import NavArea from '@/layout/header/nav/navArea';

export default function Nav() {
    return (
        <nav className='py-1 flex items-center justify-around'>
            <LogoArea />
            <NavArea />
            <AccountArea />
        </nav>
    );
}

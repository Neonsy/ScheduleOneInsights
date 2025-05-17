import { siteLinks } from '@/lib/navigation/links';
import Link from 'next/link';

export default function LogoArea() {
    return <Link href={siteLinks.home.href}>ScheduleOneInsights</Link>;
}

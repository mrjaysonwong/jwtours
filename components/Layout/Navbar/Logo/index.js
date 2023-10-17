import Image from 'next/image';
import Link from 'next/link';
import { LogoWrapper } from './styled';

export default function Logo() {
  return (
    <LogoWrapper>
      <Link href="/">
        <a>
          <Image
            src={'/assets/logo.png'}
            width={55}
            height={30}
            priority
            alt="logo"
          />
        </a>
      </Link>
    </LogoWrapper>
  );
}

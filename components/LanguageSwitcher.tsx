'use client';
import Link from 'next/link';
import {usePathname} from 'next/navigation';

export default function LanguageSwitcher({locale}:{locale:'en'|'nl'}){
  const pathname = usePathname() || '/en';
  const target = locale === 'en' ? 'nl' : 'en';
  const parts = pathname.split('/');
  if (parts[1] === 'en' || parts[1] === 'nl') parts[1] = target; else parts.splice(1,0,target);
  const href = parts.join('/') || `/${target}`;
  return <Link href={href} className="btn">{target === 'nl' ? 'Nederlands' : 'English'}</Link>;
}

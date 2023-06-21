import NextLink, { LinkProps } from 'next/link';
import { PropsWithChildren } from 'react';

export default function Link(props: PropsWithChildren<LinkProps>) {
  const { children } = props;
  return (
    <NextLink {...props} className="text-slate-500 hover:text-slate-900">
      {children}
    </NextLink>
  );
}

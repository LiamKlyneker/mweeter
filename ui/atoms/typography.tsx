import { PropsWithChildren } from 'react';
import { cva, VariantProps } from 'class-variance-authority';

type TypographyProps = PropsWithChildren &
  VariantProps<typeof typographyStyles> & {
    variant?: 'h1' | 'h2' | 'p';
    className?: string;
  };

export default function Typography(props: TypographyProps) {
  const { variant = 'p', children, className } = props;

  if (variant === 'h1')
    return (
      <h1 className={typographyStyles({ variant, class: className })}>
        {children}
      </h1>
    );
  else if (variant === 'h2')
    return (
      <h2 className={typographyStyles({ variant, class: className })}>
        {children}
      </h2>
    );
  return (
    <p className={typographyStyles({ variant, class: className })}>
      {children}
    </p>
  );
}

const typographyStyles = cva('', {
  variants: {
    variant: {
      h1: 'text-3xl font-bold text-slate-800 mb-8',
      h2: 'text-xl font-bold text-slate-800 mb-4',
      p: 'text-sm font-normal text-slate-600',
    },
  },
});

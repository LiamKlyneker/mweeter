import { cva } from 'class-variance-authority';
import { ComponentPropsWithoutRef } from 'react';

type ButtonProps = ComponentPropsWithoutRef<'button'> & {
  variant?: 'primary' | 'follow';
};

export default function Button(props: ButtonProps) {
  const {
    children,
    type = 'button',
    variant = 'primary',
    className,
    onClick,
    disabled
  } = props;
  return (
    <button
      className={buttonStyles({ variant, class: className })}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

const buttonStyles = cva('active:scale-95 text-sm', {
  variants: {
    variant: {
      primary:
        'h-12 rounded bg-sky-600 px-10 text-white hover:bg-sky-900 w-fit',
      follow: 'border rounded-full px-4 h-6 hover:bg-black hover:text-white',
    },
  },
});

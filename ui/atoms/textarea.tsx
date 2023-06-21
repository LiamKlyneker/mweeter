import { ComponentPropsWithoutRef } from 'react';

type TextAreaProps = ComponentPropsWithoutRef<'textarea'>;

export default function TextArea(props: TextAreaProps) {
  const { name, onChange, value, maxLength } = props;

  return (
    <textarea
      className="h-32 w-full rounded border border-gray-300 p-4"
      name={name}
      onChange={onChange}
      value={value}
      maxLength={maxLength}
    />
  );
}

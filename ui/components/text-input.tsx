import { ProfileInputs } from '@/app/(default-layout)/profile/page';
import { ComponentPropsWithoutRef } from 'react';
import { UseFormRegister } from 'react-hook-form';

type TextInputProps = ComponentPropsWithoutRef<'input'> & {
  register: UseFormRegister<ProfileInputs>;
  name: keyof ProfileInputs;
  required?: boolean;
};

export default function TextInput(props: TextInputProps) {
  const { name, disabled, register, required } = props;

  return (
    <input
      className="h-10 rounded border shadow-sm px-4"
      {...register(name, { required: required ? 'This field is required' : false })}
      disabled={disabled}
    />
  );
}

'use client';
import { useEffect } from 'react';
import { SignedIn, clerkClient, useUser } from '@clerk/nextjs';
import Button from '@/ui/atoms/button';
import Typography from '@/ui/atoms/typography';
import FormField from '@/ui/components/form-field';
import TextInput from '@/ui/components/text-input';
import { useUserContext } from '@/utils/user-provider';
import { useForm } from 'react-hook-form';
import useUpdateUser from '@/utils/db/user/useUpdateUser';

export type ProfileInputs = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
};

export default function ProfilePage() {
  // const { user, isLoaded } = useUser();
  const user = useUserContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ProfileInputs>()
  const { updateUser } = useUpdateUser();

  const handleOnSubmit = async (data: ProfileInputs) => {
    const params = {
      firstName: data.firstName,
      lastName: data.lastName,
    };
    await updateUser(params);
    user.refreshUser();
  };

  useEffect(() => {
    if (user) {
      reset({
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.primaryEmail,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // useEffect(() => {
  //   if (isLoaded && !user) {
  //     window.location.href = '/';
  //   }
  // }, [isLoaded, user]);

  return (
    <SignedIn>
      <Typography variant="h1">Your Profile</Typography>

      <form
        className="flex max-w-lg flex-col gap-4"
        onSubmit={handleSubmit(handleOnSubmit)}
      >
        <div className="grid grid-cols-2 gap-6">
          <FormField label="First name" error={errors.firstName?.message}>
            <TextInput name="firstName" register={register} required />
          </FormField>
          <FormField label="Last name" error={errors.lastName?.message}>
            <TextInput name="lastName" register={register} required />
          </FormField>
        </div>
        <FormField label="Your handle (username)">
          <TextInput name="username" register={register} disabled />
        </FormField>
        <FormField label="Email address">
          <TextInput name="email" register={register} disabled />
        </FormField>

        <footer className="mt-6">
          <Button type="submit">Update info</Button>
        </footer>
      </form>
    </SignedIn>
  );
}

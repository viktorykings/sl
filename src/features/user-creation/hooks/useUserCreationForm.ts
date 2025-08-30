import { TUserCreationSchema, userSchema } from '../model/user-creation-schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export const useUserCreationForm = (onSubmit: (data: TUserCreationSchema) => void) => {
  const form = useForm<TUserCreationSchema>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  const handleSubmit = () => {
    form.handleSubmit(onSubmit);
  };

  return {
    form,
    handleSubmit,
    reset: form.reset,
  };
};

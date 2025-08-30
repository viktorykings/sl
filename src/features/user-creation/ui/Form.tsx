import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useUserCreationForm } from '../hooks/useUserCreationForm';
import { TUserCreationSchema } from '../model/user-creation-schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface UserCreationFormProps {
  onSubmit: (data: TUserCreationSchema) => void;
  onClose?: () => void;
}

export function UserCreationForm({ onSubmit, onClose }: UserCreationFormProps) {
  const { form, handleSubmit } = useUserCreationForm(onSubmit);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className='space-y-6'>
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder='Enter username' {...field} className='w-full' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type='email' placeholder='Enter email' {...field} className='w-full' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type='password' placeholder='Enter password' {...field} className='w-full' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex justify-end space-x-4'>
          {onClose && (
            <Button type='button' variant='outline' onClick={onClose}>
              Cancel
            </Button>
          )}
          <Button type='submit'>Create User</Button>
        </div>
      </form>
    </Form>
  );
}

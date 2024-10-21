import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Input } from '@/components/ui/input';
import Typography from '@/components/ui/typography';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { z } from 'zod';

const formSchema = z.object({
  userName: z.string({
    message: 'Invalid username',
  }),
  email: z.string().email({
    message: 'Invalid email address.',
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters',
  }),
  firstName: z.string({
    message: 'Invalid first name',
  }),
  lastName: z.string({
    message: 'Invalid last name',
  }),
});

const Register = () => {
  const { register, handleSubmit } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: '',
      email: '',
      password: '',
      firstName: '',
      lastName: '',
    },
  });

  return (
    <Container className="mx-0">
      <div className="flex flex-col gap-4 items-center justify-center w-full max-w-[500px]">
        <Typography variant="h2" fontWeight="bold">
          Register
        </Typography>
        <form onSubmit={handleSubmit(() => {})} className="flex flex-col gap-2 w-full">
          <Input {...register('userName')} placeholder="Your username" label="Username" />
          <Input {...register('password')} placeholder="Your password" type="password" label="Password" />
          <Input {...register('email')} placeholder="Your email" label="Email" />
          <Input {...register('firstName')} placeholder="Your first name" label="First Name" />
          <Input {...register('lastName')} placeholder="Your last name" label="Last Name" />
          <Button type="submit">
            <Typography variant="body1">Register</Typography>
          </Button>
        </form>
        <Typography variant="body2" className="text-slate-500">
          Already have account?{' '}
          <Link to="/login" className="text-orange-500 hover:underline hover:text-orange-600">
            Sign in
          </Link>
        </Typography>
      </div>
    </Container>
  );
};

export default Register;

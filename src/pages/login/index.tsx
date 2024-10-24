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
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters',
  }),
});

const Login = () => {
  const { register, handleSubmit } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: '',
      password: '',
    },
  });

  return (
    <Container className="mx-0">
      <div className="flex flex-col gap-4 items-center justify-center w-full max-w-[500px]">
        <Typography variant="h2" fontWeight="bold">
          Login
        </Typography>
        <form onSubmit={handleSubmit(() => {})} className="flex flex-col gap-2 w-full">
          <Input {...register('userName')} placeholder="Your username" label="Username" />
          <Input {...register('password')} placeholder="Your password" type="password" label="Password" />
          <Button type="submit">
            <Typography variant="body1">Login</Typography>
          </Button>
        </form>
        <Typography variant="body2" className="text-slate-500">
          Don't have account?{' '}
          <Link to="/register" className="text-orange-500 hover:underline hover:text-orange-600">
            Sign up
          </Link>
        </Typography>
      </div>
    </Container>
  );
};

export default Login;

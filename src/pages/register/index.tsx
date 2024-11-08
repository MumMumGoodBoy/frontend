import { signUp } from '@/api/usm';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Input } from '@/components/ui/input';
import Typography from '@/components/ui/typography';
import { toast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';

const formSchema = z.object({
  userName: z.string().min(1, 'Username is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  email: z.string().email('Invalid email').min(1, 'Email is required'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
});

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: '',
      email: '',
      password: '',
      firstName: '',
      lastName: '',
    },
  });
  const navigate = useNavigate();

  const { mutate: registerUser, isPending } = useMutation({
    mutationKey: ['signup'],
    mutationFn: signUp,
    onSuccess: () => {
      navigate('/login');
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Register failed',
      });
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    return registerUser(data);
  };

  return (
    <Container className="mx-0">
      <div className="flex flex-col gap-4 items-center justify-center w-full max-w-[500px]">
        <Typography variant="h2" fontWeight="bold">
          Register
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 w-full">
          <Input
            {...register('userName')}
            placeholder="Your username"
            label="Username"
            className={errors.userName ? 'input-error' : ''}
          />
          {errors.userName && (
            <Typography variant="tiny" className="text-destructive">
              {errors.userName.message}
            </Typography>
          )}

          <Input
            {...register('password')}
            placeholder="Your password"
            type="password"
            label="Password"
            className={errors.password ? 'input-error' : ''}
          />
          {errors.password && (
            <Typography variant="tiny" className="text-destructive">
              {errors.password.message}
            </Typography>
          )}

          <Input
            {...register('email')}
            placeholder="Your email"
            label="Email"
            className={errors.email ? 'input-error' : ''}
          />
          {errors.email && (
            <Typography variant="tiny" className="text-destructive">
              {errors.email.message}
            </Typography>
          )}

          <Input
            {...register('firstName')}
            placeholder="Your first name"
            label="First Name"
            className={errors.firstName ? 'input-error' : ''}
          />
          {errors.firstName && (
            <Typography variant="tiny" className="text-destructive">
              {errors.firstName.message}
            </Typography>
          )}

          <Input
            {...register('lastName')}
            placeholder="Your last name"
            label="Last Name"
            className={errors.lastName ? 'input-error' : ''}
          />
          {errors.lastName && (
            <Typography variant="tiny" className="text-destructive">
              {errors.lastName.message}
            </Typography>
          )}

          <Button type="submit" disabled={isPending}>
            <Typography variant="body1">Register</Typography>
          </Button>
        </form>
        <Typography variant="body2" className="text-slate-500">
          Already have an account?{' '}
          <Link to="/login" className="text-orange-500 hover:underline hover:text-orange-600">
            Sign in
          </Link>
        </Typography>
      </div>
    </Container>
  );
};

export default Register;

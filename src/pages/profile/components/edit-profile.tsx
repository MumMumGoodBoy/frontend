import { editProfile } from '@/api/usm';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import Typography from '@/components/ui/typography';
import { toast } from '@/hooks/use-toast';
import { useUser } from '@/providers/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  firstName: z.string({
    message: 'Invalid first name',
  }),
  lastName: z.string({
    message: 'Invalid last name',
  }),
});

export function EditProfile() {
  const { user } = useUser();
  const { register, handleSubmit, reset } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
    },
  });

  useEffect(() => {
    reset({
      firstName: user?.firstName,
      lastName: user?.lastName,
    });
  }, [reset, user]);

  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const { mutate: update, isPending } = useMutation({
    mutationKey: ['me'],
    mutationFn: editProfile,
    onSuccess: () => {
      toast({
        title: 'Profile updated',
      });
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ['me'] });
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Profile update failed',
      });
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    return update(data);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex items-center space-x-2">
            <div className="flex flex-col gap-2 w-full">
              <Input {...register('firstName')} placeholder="Your firstname" label="First Name" />
              <Input {...register('lastName')} placeholder="Your lastname" label="Last Name" />
            </div>
          </div>
          <DialogFooter className="sm:justify-end">
            <Button type="submit" disabled={isPending}>
              <Typography variant="body1">Update</Typography>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

import { changePassword } from '@/api/usm';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import Typography from '@/components/ui/typography';
import { toast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  oldPassword: z.string(),
  newPassword: z.string(),
});

export function ChangePassword() {
  const { register, handleSubmit, reset } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
    },
  });

  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const { mutate: update, isPending } = useMutation({
    mutationKey: ['password'],
    mutationFn: changePassword,
    onSuccess: () => {
      toast({
        title: 'Password updated',
      });
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ['me'] });
      reset();
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Password update failed',
      });
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    return update(data);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Change Password</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex items-center space-x-2">
            <div className="flex flex-col gap-2 w-full">
              <Input
                {...register('oldPassword')}
                placeholder="Your Old Password"
                type="password"
                label="Old Password"
              />
              <Input
                {...register('newPassword')}
                placeholder="Your New Password"
                type="password"
                label="New Password"
              />
            </div>
          </div>
          <DialogFooter className="sm:justify-end">
            <Button type="submit" disabled={isPending}>
              <Typography variant="body1">Change</Typography>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

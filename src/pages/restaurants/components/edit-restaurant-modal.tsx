import { updateRestaurantByRestaurantId } from '@/api/food-restaurant';
import { Restaurant, UpdateRestaurantRequest } from '@/api/types';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import Typography from '@/components/ui/typography';
import { toast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  address: z.string().min(1, 'Address is required'),
  phone: z.string().min(1, 'Phone number is required'),
});

export function EditRestaurantButton({ restaurant }: { restaurant: Restaurant }) {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: restaurant.name,
      address: restaurant.address,
      phone: restaurant.phone,
    },
  });

  useEffect(() => {
    reset({
      name: restaurant.name,
      address: restaurant.address,
      phone: restaurant.phone,
    });
  }, [reset, open]);

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ['updateRestaurant'],
    mutationFn: (data: UpdateRestaurantRequest) => updateRestaurantByRestaurantId(restaurant.id, data),
    onSuccess: async () => {
      toast({
        title: 'Update restaurant success',
      });
      setOpen(false);
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['foods'] }),
        queryClient.invalidateQueries({ queryKey: ['restaurants'] }),
        queryClient.invalidateQueries({ queryKey: ['restaurant', restaurant.id] }),
        queryClient.invalidateQueries({ queryKey: ['food', restaurant.id] }),
      ]);
    },
    onError: () => {
      toast({
        title: 'Update restaurant failed',
        variant: 'destructive',
      });
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    return mutate({
      name: data.name,
      address: data.address,
      phone: data.phone,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" className="w-1/2">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Food</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex items-center space-x-2">
            <div className="flex flex-col gap-2 w-full">
              <Input label="Name" {...register('name')} defaultValue={restaurant.name} />
              {errors.name && (
                <Typography variant="tiny" className="text-destructive">
                  {errors.name.message}
                </Typography>
              )}
              <Input label="Address" {...register('address')} />
              {errors.address && (
                <Typography variant="tiny" className="text-destructive">
                  {errors.address.message}
                </Typography>
              )}
              <Input label="Phone" type="string" step="0.01" {...register('phone')} />
              {errors.phone && (
                <Typography variant="tiny" className="text-destructive">
                  {errors.phone.message}
                </Typography>
              )}
            </div>
          </div>
          <DialogFooter className="sm:justify-end">
            <Button type="submit" disabled={false}>
              <Typography variant="body1">Edit</Typography>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

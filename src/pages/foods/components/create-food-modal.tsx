import { createFood } from '@/api/food-restaurant';
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
  description: z.string().min(1, 'Description is required'),
  price: z.number().min(1, 'Price is required'),
  image_url: z.string().min(1, 'Image url is required'),
  restaurant_id: z.string().min(1, 'Restaurant id is required'),
});

interface CreateFoodButtonProps {
  restaurantId: string;
}

export function CreateFoodButton({ restaurantId }: CreateFoodButtonProps) {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      image_url: '',
      restaurant_id: restaurantId,
    },
  });

  useEffect(() => {
    reset({
      name: '',
      description: '',
      price: 0,
      image_url: '',
      restaurant_id: restaurantId,
    });
  }, [reset, open]);

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ['createFood'],
    mutationFn: createFood,
    onSuccess: async () => {
      toast({
        title: 'Create food success',
      });
      setOpen(false);
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['restaurant', restaurantId] }),
        queryClient.invalidateQueries({ queryKey: ['food', restaurantId] }),
      ]);
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Create food failed',
      });
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    return mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Food</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Food</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex items-center space-x-2">
            <div className="flex flex-col gap-2 w-full">
              <Input label="Name" {...register('name')} />
              {errors.name && (
                <Typography variant="tiny" className="text-destructive">
                  {errors.name.message}
                </Typography>
              )}
              <Input label="Description" {...register('description')} />
              {errors.description && (
                <Typography variant="tiny" className="text-destructive">
                  {errors.description.message}
                </Typography>
              )}
              <Input label="Price" type="number" step="0.01" {...register('price', { valueAsNumber: true })} />
              {errors.price && (
                <Typography variant="tiny" className="text-destructive">
                  {errors.price.message}
                </Typography>
              )}
              <Input label="Image url" {...register('image_url')} />
              {errors.image_url && (
                <Typography variant="tiny" className="text-destructive">
                  {errors.image_url.message}
                </Typography>
              )}
            </div>
          </div>
          <DialogFooter className="sm:justify-end">
            <Button type="submit" disabled={false}>
              <Typography variant="body1">Create</Typography>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

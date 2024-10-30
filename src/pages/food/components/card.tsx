import { Button } from '@/components/ui/button';
import Typography from '@/components/ui/typography';
import { Link } from 'react-router-dom';

export default function FoodCard() {
  const isAdmin = true;
  return (
    <div className="flex flex-col items-center justify-center p-6 max-lg:flex-col gap-4 border rounded-md shadow-sm bg-white">
      <div className="flex justify-between w-full items-center">
        <Link to="/food/1">
          <Typography className="hover:underline hover:cursor-pointer">fffdddd</Typography>
        </Link>
      </div>
      <img src="/src/assets/food4.svg" alt="profile" className="w-[150px] h-[150px]" />

      <div className="flex flex-col gap-1 text-start w-full">
        <Typography variant="body2" className="break-all">
          dfsdfsfsfdsf dsf dsfdsf dsf dsfds dsf sdf dsfsdf sdf sdf ds fsd gsdgskg nslnflsen fnse nfsenf lsdnf{' '}
        </Typography>
      </div>

      {isAdmin && (
        <div className="flex gap-2 w-full">
          <Button className="w-1/2" variant="secondary">
            Edit
          </Button>
          <Button className="w-1/2">Delete</Button>
        </div>
      )}
    </div>
  );
}

import { Container } from '@/components/ui/container';
import { Pill } from '@/components/ui/pill';
import Typography from '@/components/ui/typography';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Container className="flex flex-col p-2 gap-4 text-center">
      <Typography variant="h3" fontWeight="bold" className="text-slate-800">
        Welcome to WongChula!
      </Typography>
      <Typography variant="h4" className="text-slate-600">
        Explore the best places to eat, drink, and relax in Chula.
      </Typography>
      <Link to="/food">
        <Pill className="left-72 top-20 hover:underline cursor-pointer">Discover foods</Pill>
      </Link>
      <Link to="/restaurant">
        <Pill className="right-36 top-20 hover:underline cursor-pointer">Discover Restaurants</Pill>
      </Link>
      <Link to="/suggest">
        <Pill className="left-96 bottom-24 hover:underline cursor-pointer">Get suggest</Pill>
      </Link>
      <Pill className="right-96 bottom-40">🍔</Pill>
      <Pill className="left-[600px] bottom-52">🥐</Pill>
      <Pill className="left-[600px] top-52">🥗</Pill>
    </Container>
  );
};

export default Home;
